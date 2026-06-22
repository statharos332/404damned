# 📧 Contact Form → Email (Google Workspace OAuth2 + Vercel)

Your form (and the booking modal) both POST to `/api/contact`, which emails
every lead straight into your own `info@404damned.com` mailbox via
Google Workspace, authenticated with **OAuth2** (no app password, no
third-party email provider).

## 1. What you need (from Google Cloud Console + OAuth Playground)
- A Google Cloud project with the **Gmail API** enabled
- An **OAuth 2.0 Client ID** (Web application) → gives you `client_id` +
  `client_secret`
- A **refresh token** for `info@404damned.com`, generated once via
  [Google OAuth 2.0 Playground](https://developers.google.com/oauthplayground)
  using the `https://mail.google.com/` (or narrower `gmail.send`) scope,
  authorized while logged in as `info@404damned.com`

If you've already done this, you have 4 values: `client_id`,
`client_secret`, and a `refresh_token` from the token exchange response.

> Scope note: `https://mail.google.com/` grants full mailbox access
> (read/send/delete). If you only need to *send* mail, regenerate the
> token with the narrower `https://www.googleapis.com/auth/gmail.send`
> scope instead — same flow, smaller blast radius if the token ever leaks.

## 2. Add environment variables in Vercel
Vercel → your project → **Settings → Environment Variables** → add:

| Name                    | Value                                    |
|-------------------------|-------------------------------------------|
| `GMAIL_USER`            | `info@404damned.com`                      |
| `GOOGLE_CLIENT_ID`      | the OAuth client ID                       |
| `GOOGLE_CLIENT_SECRET`  | the OAuth client secret                   |
| `GOOGLE_REFRESH_TOKEN`  | the refresh token from step 1             |
| `CONTACT_TO`            | `info@404damned.com` (optional — defaults to `GMAIL_USER`) |

Apply to **Production, Preview, Development**. Then **redeploy** (Vercel →
Deployments → ⋯ → Redeploy) so the new vars load.

**Never commit these values.** They only belong in Vercel's env var UI and
your local `.env.local` (already gitignored).

## 3. Local dev
`.env.local` (gitignored, not committed):
```bash
GMAIL_USER=info@404damned.com
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REFRESH_TOKEN=...
CONTACT_TO=info@404damned.com
```
```bash
npm install   # installs nodemailer
npm run dev
```

## 4. Test it
Submit the contact form (or book a call) on the site. Check the
`info@404damned.com` inbox. Hit **Reply** in that email — it replies
straight to the lead (reply-to is set to their address).

## Troubleshooting
- **"Server email is not configured yet."** → a Vercel env var is missing
  or you didn't redeploy after adding them.
- **`invalid_grant` / auth error** → the refresh token was revoked or
  generated for the wrong Google account — regenerate it in the OAuth
  Playground while logged in as `info@404damned.com`.
- **Nothing arrives** → check spam; open Vercel → your deployment →
  **Logs** to see the SMTP/OAuth error.

## If the client secret or refresh token ever leak
Go to **Google Cloud Console → APIs & Services → Credentials** to rotate
the client secret, and **myaccount.google.com/permissions** (as
`info@404damned.com`) to revoke the old refresh token, then redo step 1.

## Spam protection
A hidden **honeypot** field is already included. Bots that fill it are
silently dropped (no email sent). For heavier protection later, add
Cloudflare Turnstile or hCaptcha.
