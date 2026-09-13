import { spawn } from "node:child_process";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import assert from "node:assert/strict";

// Isolated local browser verification; never uses a personal browser profile.
const profile = await mkdtemp(join(tmpdir(), "upcapital-dashboard-"));
const chrome = spawn(
  process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe",
  [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    "--remote-debugging-port=0",
    `--user-data-dir=${profile}`,
    "about:blank",
  ],
  { windowsHide: true, stdio: "ignore" },
);
let socket;
let nextId = 0;
let sessionId;
const pending = new Map();
const errors = [];
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function until(check, label) {
  const deadline = Date.now() + 60000;
  while (Date.now() < deadline) {
    const result = await check();
    if (result) return result;
    await pause(250);
  }
  throw new Error(`Timed out: ${label}`);
}
function send(method, params = {}, session = sessionId) {
  const id = ++nextId;
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      pending.delete(id);
      reject(new Error(`CDP timeout: ${method}`));
    }, 30000);
    pending.set(id, { resolve, reject, timeout });
    socket.send(JSON.stringify({ id, method, params, ...(session ? { sessionId: session } : {}) }));
  });
}
async function evaluate(expression) {
  const result = await send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}
async function click(selector) {
  await evaluate(
    `document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'center',behavior:'instant'})`,
  );
  await pause(100);
  const point = await evaluate(
    `(() => {const r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`,
  );
  await send("Input.dispatchMouseEvent", {
    type: "mousePressed",
    ...point,
    button: "left",
    clickCount: 1,
  });
  await send("Input.dispatchMouseEvent", {
    type: "mouseReleased",
    ...point,
    button: "left",
    clickCount: 1,
  });
  await pause(150);
}
async function viewport(width) {
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await pause(100);
  assert.ok(
    await evaluate("document.documentElement.scrollWidth <= document.documentElement.clientWidth"),
    `Horizontal overflow at ${width}px`,
  );
}
async function screenshot(name) {
  const image = await send("Page.captureScreenshot", { format: "png" });
  const path = join(profile, name + ".png");
  await writeFile(path, Buffer.from(image.data, "base64"));
  return path;
}

try {
  chrome.on("error", (error) => errors.push(error.message));
  const port = await until(async () => {
    try {
      return (await readFile(join(profile, "DevToolsActivePort"), "utf8")).split("\n");
    } catch {
      return false;
    }
  }, "Chrome startup");
  socket = new WebSocket(`ws://127.0.0.1:${port[0]}${port[1]}`);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const task = pending.get(message.id);
      pending.delete(message.id);
      clearTimeout(task.timeout);
      if (message.error) task.reject(new Error(message.error.message));
      else task.resolve(message.result);
    }
    if (message.method === "Runtime.exceptionThrown")
      errors.push(message.params.exceptionDetails.text);
    if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error")
      errors.push(message.params.args.map((arg) => arg.value || arg.description).join(" "));
  });
  const { targetId } = await send("Target.createTarget", { url: "about:blank" }, null);
  ({ sessionId } = await send("Target.attachToTarget", { targetId, flatten: true }, null));
  await send("Runtime.enable");
  await send("Page.enable");
  await viewport(1440);
  await send("Page.navigate", {
    url: process.env.DASHBOARD_PREVIEW_URL || "http://localhost:3000/design-system/dashboard",
  });
  await until(
    () =>
      evaluate(
        "!!document.querySelector('button[aria-label=\"Collapse sidebar\"]') && Object.keys(document.querySelector('button[aria-label=\"Collapse sidebar\"]')).some(key=>key.startsWith('__reactProps$'))",
      ),
    "dashboard hydration",
  );
  const desktop = await screenshot("desktop");
  await click('button[aria-label="Collapse sidebar"]');
  assert.equal(
    await evaluate(
      "document.querySelector('aside[aria-label=\"Sidebar\"]').getBoundingClientRect().width",
    ),
    88,
  );
  await click('button[aria-label="Expand sidebar"]');
  assert.equal(
    await evaluate(
      "document.querySelector('aside[aria-label=\"Sidebar\"]').getBoundingClientRect().width",
    ),
    256,
  );
  for (const period of ["1D", "7D", "1M", "3M", "1Y", "ALL"]) {
    const selector = '[aria-label="Portfolio performance period"] button';
    const index = await evaluate(
      `Array.from(document.querySelectorAll(${JSON.stringify(selector)})).findIndex(el=>el.textContent.trim()===${JSON.stringify(period)})`,
    );
    await click(`${selector}:nth-child(${index + 1})`);
    assert.equal(
      await evaluate(
        "document.querySelector('[aria-label=\"Portfolio performance period\"] [aria-pressed=true]').textContent.trim()",
      ),
      period,
    );
  }
  for (const width of [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920]) await viewport(width);
  await viewport(320);
  await evaluate("window.scrollTo(0,0)");
  const mobile = await screenshot("mobile");
  await click('button[aria-label="Open dashboard navigation"]');
  assert.equal(await evaluate("document.body.style.overflow"), "hidden");
  assert.equal(await evaluate("document.activeElement.getAttribute('aria-label')"), "Close drawer");
  await send("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: "Tab",
    code: "Tab",
    windowsVirtualKeyCode: 9,
    modifiers: 8,
  });
  await send("Input.dispatchKeyEvent", {
    type: "keyUp",
    key: "Tab",
    code: "Tab",
    windowsVirtualKeyCode: 9,
  });
  assert.equal(await evaluate("document.activeElement.textContent.trim()"), "Sign out");
  await send("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: "Tab",
    code: "Tab",
    windowsVirtualKeyCode: 9,
  });
  await send("Input.dispatchKeyEvent", {
    type: "keyUp",
    key: "Tab",
    code: "Tab",
    windowsVirtualKeyCode: 9,
  });
  assert.equal(await evaluate("document.activeElement.getAttribute('aria-label')"), "Close drawer");
  const drawer = await screenshot("drawer");
  await send("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: "Escape",
    code: "Escape",
    windowsVirtualKeyCode: 27,
  });
  await send("Input.dispatchKeyEvent", {
    type: "keyUp",
    key: "Escape",
    code: "Escape",
    windowsVirtualKeyCode: 27,
  });
  await pause(100);
  assert.equal(await evaluate("!!document.querySelector('[role=dialog]')"), false);
  assert.equal(
    await evaluate("document.activeElement.getAttribute('aria-label')"),
    "Open dashboard navigation",
  );
  assert.notEqual(await evaluate("document.body.style.overflow"), "hidden");
  await click('button[aria-label="Switch to light mode"]');
  assert.equal(
    await evaluate("document.querySelector('[data-client-theme]').dataset.clientTheme"),
    "light",
  );
  for (const width of [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920]) await viewport(width);
  await viewport(1440);
  await evaluate("window.scrollTo(0,0)");
  const light = await screenshot("light-desktop");
  await send("Page.reload");
  await until(
    () =>
      evaluate(
        "document.querySelector('[data-client-theme]')?.dataset.clientTheme === 'light' && !!document.querySelector('button[aria-label=\"Switch to dark mode\"]')",
      ),
    "persisted light theme",
  );
  await viewport(320);
  const lightMobile = await screenshot("light-mobile");
  await click('button[aria-label="Open dashboard navigation"]');
  const lightDrawer = await screenshot("light-drawer");
  await send("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: "Escape",
    code: "Escape",
    windowsVirtualKeyCode: 27,
  });
  await send("Input.dispatchKeyEvent", {
    type: "keyUp",
    key: "Escape",
    code: "Escape",
    windowsVirtualKeyCode: 27,
  });
  const previewUrl =
    process.env.DASHBOARD_PREVIEW_URL || "http://localhost:3000/design-system/dashboard";
  await send("Page.navigate", { url: previewUrl + "?disclosure=1" });
  await until(() => evaluate("!!document.querySelector('dialog[open]')"), "disclosure modal");
  const disclosure = await screenshot("disclosure-mobile");
  await evaluate("window.disclosureEvents = []; document.querySelector('dialog').addEventListener('cancel', event => window.disclosureEvents.push({type:'cancel', prevented:event.defaultPrevented})); document.querySelector('dialog').addEventListener('close', () => window.disclosureEvents.push({type:'close'}))");
  await send("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: "Escape",
    code: "Escape",
    windowsVirtualKeyCode: 27,
  });
  await send("Input.dispatchKeyEvent", {
    type: "keyUp",
    key: "Escape",
    code: "Escape",
    windowsVirtualKeyCode: 27,
  });
  assert.equal(await evaluate("!!document.querySelector('dialog[open]')"), true, JSON.stringify({ events: await evaluate("window.disclosureEvents"), errors }));
  await click('dialog input[type="checkbox"]');
  await click('dialog button[type="submit"]');
  await until(
    () => evaluate("!document.querySelector('dialog[open]')"),
    "deliberate disclosure acknowledgement",
  );
  assert.equal(await evaluate("document.activeElement.id"), "dashboard-content");
  assert.notEqual(await evaluate("document.body.style.overflow"), "hidden");
  await click('button[aria-label="Switch to dark mode"]');
  assert.equal(
    await evaluate("document.querySelector('[data-client-theme]').dataset.clientTheme"),
    "dark",
  );
  assert.deepEqual(errors, []);
  console.log(
    JSON.stringify({
      passed: true,
      checks: [
        "desktop collapse/expand",
        "six period controls",
        "nine responsive widths in both themes",
        "theme reload persistence",
        "drawer focus trap/Escape/return focus",
        "disclosure deliberate acknowledgement and focus restoration",
        "no console errors",
      ],
      screenshots: { desktop, mobile, drawer, light, lightMobile, lightDrawer, disclosure },
    }),
  );
} finally {
  socket?.close();
  for (const task of pending.values()) clearTimeout(task.timeout);
  chrome.kill();
}
