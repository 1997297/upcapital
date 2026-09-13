# Authentication email setup

**Owner decision:** Custom SMTP, Resend activation and domain configuration are deferred until production preparation. Continue feature development with the existing Supabase environment. The setup below remains the production checklist and is not a development blocker. Email confirmation and MFA checks remain enabled; development does not bypass protected account access.

Recommended provider: **Resend**, connected directly to **Supabase custom SMTP**. This keeps token generation, verification and recovery in Supabase Auth; the application does not need a Resend SDK, public email endpoint or Resend secret. Resend has an official Supabase SMTP integration guide and a free plan suitable for initial development. Check current limits before public launch (the free plan currently has a 100-message daily limit).

Sources: [Supabase integration](https://resend.com/docs/send-with-supabase-smtp), [pricing](https://resend.com/pricing), [domain verification](https://resend.com/docs/dashboard/domains/introduction).

## What is ready

- The separate UPCAPITAL Supabase project is connected: `wgztsfxtbfvyrmctanpv`.
- Signup, resend and reset actions already delegate delivery to Supabase.
- PKCE confirmation/recovery callbacks and expired-link handling are implemented.
- Ready-to-upload HTML templates are in `supabase/templates/confirmation.html` and `supabase/templates/recovery.html`.
- Development and production use the same authentication code. There is no fake success or email-confirmation bypass.

## Activate delivery

1. Create a Resend account and add a sending domain/subdomain you control. A dedicated account-email subdomain is suitable. Do not assume the existing website's `upcapital.com` business copy establishes DNS ownership.
2. Publish the exact DNS records Resend provides and wait for verification. Preserve any existing mailbox records; use only the requested sending records.
3. Create a sending API key, restricted to the verified domain where supported. Store it privately; it is the SMTP password, not a browser environment variable.
4. Open [UPCAPITAL authentication email settings](https://supabase.com/dashboard/project/wgztsfxtbfvyrmctanpv/auth/email). Enable custom SMTP and enter:

| Setting        | Value                                                   |
| -------------- | ------------------------------------------------------- |
| Sender name    | UPCapital                                               |
| Sender address | A mailbox-style address on your verified sending domain |
| Host           | `smtp.resend.com`                                       |
| Port           | `465`                                                   |
| Username       | `resend`                                                |
| Password       | The private Resend API key                              |

5. Disable click/link tracking for authentication emails so the confirmation URL is not rewritten. Keep open tracking disabled for these security messages.
6. Upload `confirmation.html` as the Confirm signup template, subject **Verify your UPCapital email**. Upload `recovery.html` as the Reset password template, subject **Reset your UPCapital password**. Retain `{{ .ConfirmationURL }}` exactly; Supabase expands it to the real signed link. It is a template variable, not development copy.
7. In [URL configuration](https://supabase.com/dashboard/project/wgztsfxtbfvyrmctanpv/auth/url-configuration), set the local Site URL to `http://localhost:3000` and add these allowed redirects:

```text
http://localhost:3000/auth/callback
http://localhost:3000/auth/callback?next=reset-password
```

When deploying, set both the Site URL and `NEXT_PUBLIC_APP_URL` to the approved HTTPS origin and add the equivalent exact HTTPS callbacks. Use the configured origin for email testing; the `3100` preview is for UI review and does not change the configured `3000` email return origin.

8. Keep email confirmation enabled and set a provider-side minimum password length of 12. Enable TOTP enrollment/verification. Review Supabase and Resend rate limits for the intended launch volume.

## Finish verification

Use an inbox approved for receiving test emails:

1. Register and confirm the email in the initiating browser.
2. Confirm the account page shows the actual verified email.
3. Enroll an authenticator, sign out and sign back in; access must stop at the six-digit challenge.
4. Request a password reset, follow its email link, complete MFA if enabled, and save a new password. Verify the old password fails.
5. Verify expired/reused links fail safely and resend recovers the flow.
6. Check Resend delivery logs for delivered/bounced messages; no app message alone proves delivery.

An account/domain/API key is not currently connected to Resend. These external credentials and DNS access are the remaining setup dependency, not an application coding dependency. Supabase's default SMTP is limited to approved team addresses and is unsuitable for public registration. No emails have been sent as part of the automated checks.
