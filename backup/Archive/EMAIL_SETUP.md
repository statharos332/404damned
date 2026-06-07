# 📧 Contact Form → Email (Resend + Vercel)

Your form now POSTs to `/api/contact`, which emails every lead to your
inbox. Setup takes ~2 minutes.

## 1. Create a Resend account (free)
- Go to **https://resend.com** → sign up
- Free tier = **3,000 emails/month**, plenty for a contact form
- **API Keys** → *Create API Key* → copy it (starts with `re_…`)

## 2. Verify your sending domain (recommended)
- Resend → **Domains** → *Add Domain* → enter `404damned.nl`
- Add the DNS records it shows (in your domain registrar)
- Once verified you can send from `noreply@404damned.nl`
- **Shortcut to test first:** skip this and set
  `CONTACT_FROM="404 DAMNED <onboarding@resend.dev>"` — works instantly,
  just less branded. Switch to your domain when verified.

## 3. Add 3 environment variables in Vercel
Vercel → your project → **Settings → Environment Variables** → add:

| Name             | Value                                   |
|------------------|-----------------------------------------|
| `RESEND_API_KEY` | `re_xxxxxxxxxxxx` (from step 1)         |
| `CONTACT_TO`     | `hello@404damned.nl` (where leads go)   |
| `CONTACT_FROM`   | `404 DAMNED <noreply@404damned.nl>`     |

Apply to **Production, Preview, Development**. Then **redeploy** (Vercel →
Deployments → ⋯ → Redeploy) so the new vars load.

## 4. Local dev (optional)
```bash
cp .env.example .env.local   # fill in the 3 values
npm install                  # installs resend
npm run dev
```

## 5. Test it
Submit the form on your site. Check the inbox set in `CONTACT_TO`.
Hit **Reply** in that email — it replies straight to the lead (reply-to
is set to their address).

## Troubleshooting
- **"Server email is not configured yet."** → a Vercel env var is missing
  or you didn't redeploy after adding them.
- **Nothing arrives** → check **spam**; verify your domain (step 2);
  open Vercel → your deployment → **Logs** to see the error.
- **403 / domain error from Resend** → `CONTACT_FROM` must be on a
  verified domain, or use `onboarding@resend.dev` while testing.

## Spam protection
A hidden **honeypot** field is already included. Bots that fill it are
silently dropped (no email sent). For heavier protection later, add
Cloudflare Turnstile or hCaptcha.
