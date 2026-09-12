"use client";

import { useState } from "react";
import {
  Accordion,
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  DataTable,
  Drawer,
  Dropdown,
  DropdownItem,
  Eyebrow,
  FinancialValue,
  Heading,
  Input,
  Modal,
  PageContainer,
  SectionTitle,
  Select,
  Skeleton,
  Tabs,
  Text,
  Tooltip,
  useToast,
} from "@/components/ui";

const accordionItems = [
  {
    id: "security",
    title: "How is my account protected?",
    content:
      "UPCAPITAL interfaces are designed around layered authentication, session controls and server-side authorization. Production security controls will be implemented in their dedicated phases.",
  },
  {
    id: "returns",
    title: "Are returns guaranteed?",
    content:
      "No. Digital assets involve risk and performance can vary. Interface copy must never represent illustrative or historical performance as guaranteed future returns.",
  },
  {
    id: "withdrawals",
    title: "How will withdrawals work?",
    content:
      "Withdrawals will use a verified, auditable workflow with status tracking, confirmation and additional security checks once the backend is implemented.",
  },
];

type DemoRow = {
  id: string;
  type: string;
  amount: string;
  status: "Completed" | "Pending";
  date: string;
};
const rows: DemoRow[] = [
  {
    id: "TX-2048",
    type: "Deposit",
    amount: "$2,500.00",
    status: "Completed",
    date: "Sep 12, 2026",
  },
  { id: "TX-2047", type: "Withdrawal", amount: "$640.00", status: "Pending", date: "Sep 11, 2026" },
];

export function DesignSystemShowcase() {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { toast } = useToast();

  return (
    <main className="relative min-h-screen overflow-hidden pb-24">
      <div className="ui-grid-background pointer-events-none absolute inset-x-0 top-0 h-[42rem] opacity-60" />
      <PageContainer className="relative pt-16 md:pt-24">
        <header className="max-w-3xl">
          <Eyebrow>UPCAPITAL / DESIGN SYSTEM</Eyebrow>
          <SectionTitle className="mt-4">Phase 2 component library.</SectionTitle>
          <Text className="mt-5 max-w-2xl text-lg">
            The reusable visual language for the public website, client cabinet and administrative
            platform. Explore the shared interface components and interaction patterns.
          </Text>
        </header>

        <div className="mt-16 space-y-16">
          <Showcase
            title="Buttons"
            description="Five semantic variants with consistent sizing, focus, hover, press, disabled and loading states."
          >
            <div className="flex flex-wrap gap-3">
              <Button>Primary action</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button loading>Processing</Button>
            </div>
          </Showcase>

          <Showcase
            title="Inputs & selects"
            description="Accessible labels, guidance, error treatment and financial-form-ready controls."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Input
                id="amount"
                label="Investment amount"
                placeholder="5,000"
                leading="$"
                hint="Minimum values will be defined by strategy configuration."
              />
              <Select id="scenario" label="Scenario" defaultValue="moderate">
                <option value="conservative">Conservative</option>
                <option value="moderate">Moderate</option>
                <option value="aggressive">Aggressive</option>
              </Select>
              <Input id="email" label="Email address" placeholder="name@example.com" type="email" />
              <Input
                id="invalid"
                label="Withdrawal destination"
                value=""
                onChange={() => undefined}
                error="A verified destination is required."
                placeholder="Enter destination"
              />
            </div>
          </Showcase>

          <Showcase
            title="Cards & badges"
            description="Surfaces remain restrained: subtle borders, controlled elevation and status colors used only when meaningful."
          >
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Heading>Portfolio value</Heading>
                    <Badge variant="success">+4.28%</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <FinancialValue className="text-3xl font-bold text-text-primary">
                    $24,820.42
                  </FinancialValue>
                  <Text className="mt-2 text-sm">
                    Financial value formatting and status treatment.
                  </Text>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Heading>Account status</Heading>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  <Badge variant="success">Verified</Badge>
                  <Badge variant="warning">Pending</Badge>
                  <Badge variant="danger">Action required</Badge>
                  <Badge variant="accent">Secure</Badge>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Heading>Strategy monitoring</Heading>
                </CardHeader>
                <CardContent>
                  <Text>
                    Reusable surface for strategy state, allocations, risk information and
                    reporting.
                  </Text>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm">
                    View details
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </Showcase>

          <Showcase
            title="Overlays & feedback"
            description="Modal, drawer, dropdown, tooltip and toast patterns for contextual actions without overwhelming the interface."
          >
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline" onClick={() => setModalOpen(true)}>
                Open modal
              </Button>
              <Button variant="outline" onClick={() => setDrawerOpen(true)}>
                Open drawer
              </Button>
              <Dropdown
                trigger={
                  <span className="inline-flex h-11 items-center rounded-lg border border-white/10 bg-white/[0.025] px-4 text-sm font-semibold">
                    Open dropdown ▾
                  </span>
                }
              >
                <DropdownItem>View details</DropdownItem>
                <DropdownItem>Download report</DropdownItem>
                <DropdownItem className="text-danger">Remove</DropdownItem>
              </Dropdown>
              <Tooltip content="Contextual help without adding permanent visual noise.">
                <button className="size-10 rounded-full border border-white/10 text-sm font-bold text-text-secondary">
                  ?
                </button>
              </Tooltip>
              <Button
                variant="secondary"
                onClick={() =>
                  toast({
                    title: "Profile saved",
                    description: "Your changes were stored successfully.",
                    tone: "success",
                  })
                }
              >
                Show toast
              </Button>
            </div>
          </Showcase>

          <Showcase
            title="Tabs & accordion"
            description="Reusable disclosure/navigation patterns for performance periods, account panels, FAQs and settings."
          >
            <div className="grid gap-8 lg:grid-cols-2">
              <Tabs
                items={[
                  {
                    value: "1m",
                    label: "1M",
                    content: <PanelText>One-month reporting view.</PanelText>,
                  },
                  {
                    value: "3m",
                    label: "3M",
                    content: <PanelText>Three-month reporting view.</PanelText>,
                  },
                  {
                    value: "1y",
                    label: "1Y",
                    content: <PanelText>One-year reporting view.</PanelText>,
                  },
                  {
                    value: "all",
                    label: "ALL",
                    content: <PanelText>All available historical data.</PanelText>,
                  },
                ]}
              />
              <Accordion items={accordionItems} defaultOpen="security" />
            </div>
          </Showcase>

          <Showcase
            title="Loading states"
            description="Skeletons preserve layout while asynchronous financial data is loading."
          >
            <div className="grid gap-4 md:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <Card key={item}>
                  <CardContent>
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="mt-5 h-8 w-40" />
                    <Skeleton className="mt-4 h-3 w-full" />
                    <Skeleton className="mt-2 h-3 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </Showcase>

          <Showcase
            title="Data table shell"
            description="Responsive horizontal overflow, consistent financial alignment and semantic table markup."
          >
            <DataTable
              columns={[
                {
                  key: "ref",
                  header: "Reference",
                  render: (row: DemoRow) => (
                    <span className="font-medium text-text-primary">{row.id}</span>
                  ),
                },
                { key: "type", header: "Type", render: (row: DemoRow) => row.type },
                { key: "date", header: "Date", render: (row: DemoRow) => row.date },
                {
                  key: "status",
                  header: "Status",
                  render: (row: DemoRow) => (
                    <Badge variant={row.status === "Completed" ? "success" : "warning"}>
                      {row.status}
                    </Badge>
                  ),
                },
                {
                  key: "amount",
                  header: "Amount",
                  align: "right",
                  render: (row: DemoRow) => (
                    <FinancialValue className="font-semibold text-text-primary">
                      {row.amount}
                    </FinancialValue>
                  ),
                },
              ]}
              data={rows}
              getRowKey={(row) => row.id}
            />
          </Showcase>
        </div>
      </PageContainer>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm action"
        description="Financial actions will use explicit confirmation before they are submitted."
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setModalOpen(false);
                toast({ title: "Action confirmed", tone: "success" });
              }}
            >
              Confirm
            </Button>
          </>
        }
      >
        <Text>This component preview does not perform a financial transaction.</Text>
      </Modal>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Account panel">
        <Text>
          Drawers will support mobile navigation, filters and contextual account actions without
          replacing the current page.
        </Text>
        <div className="mt-6 space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            Profile
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Security
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Notifications
          </Button>
        </div>
      </Drawer>
    </main>
  );
}

function Showcase({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-6 max-w-2xl">
        <h2 className="text-xl font-bold tracking-[-0.02em]">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-text-secondary">{description}</p>
      </div>
      {children}
    </section>
  );
}

function PanelText({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-5 text-sm text-text-secondary">
      {children}
    </div>
  );
}
