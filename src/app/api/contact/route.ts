import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * ============================================================
 *  404 DAMNED — Contact form → email  (Google Workspace, OAuth2)
 * ============================================================
 *  Sends every submission straight to info@404damned.com via your own
 *  Google Workspace mailbox — no third-party email provider.
 *  Set these in Vercel → Project → Settings → Environment Variables:
 *    GMAIL_USER           = info@404damned.com
 *    GOOGLE_CLIENT_ID     = OAuth client ID
 *    GOOGLE_CLIENT_SECRET = OAuth client secret
 *    GOOGLE_REFRESH_TOKEN = long-lived refresh token for that mailbox
 *    CONTACT_TO           = where leads land (defaults to GMAIL_USER)
 *  See EMAIL_SETUP.md for the setup walkthrough.
 * ============================================================
 */

function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GMAIL_USER,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    },
  });
}

// Basic shape of what the form sends
interface ContactPayload {
  name?: string;
  email?: string;
  company?: string;
  service?: string;
  budget?: string;
  message?: string;
  // honeypot — real users never fill this; bots do
  website?: string;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as ContactPayload;

    // 1) Honeypot: if filled, silently accept (don't email, don't tip off bots)
    if (data.website) {
      return NextResponse.json({ ok: true });
    }

    // 2) Validate required fields
    const name = (data.name || "").trim();
    const email = (data.email || "").trim();
    const message = (data.message || "").trim();

    if (!name || !email) {
      return NextResponse.json(
        { ok: false, error: "Name and email are required." },
        { status: 400 }
      );
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email." },
        { status: 400 }
      );
    }

    // 3) Guard against missing config so you get a clear error in logs
    const gmailUser = process.env.GMAIL_USER;
    const contactTo = process.env.CONTACT_TO || gmailUser;
    if (
      !gmailUser ||
      !contactTo ||
      !process.env.GOOGLE_CLIENT_ID ||
      !process.env.GOOGLE_CLIENT_SECRET ||
      !process.env.GOOGLE_REFRESH_TOKEN
    ) {
      console.error(
        "Contact form: missing GMAIL_USER / GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / GOOGLE_REFRESH_TOKEN / CONTACT_TO env vars."
      );
      return NextResponse.json(
        { ok: false, error: "Server email is not configured yet." },
        { status: 500 }
      );
    }

    const company = (data.company || "—").trim();
    const service = (data.service || "—").trim();
    const budget = (data.budget || "—").trim();
    const safeMessage = message ? escapeHtml(message) : "—";

    // 4) Send the email to you
    const transporter = getTransporter();
    await transporter.sendMail({
      from: `404 DAMNED <${gmailUser}>`,
      to: contactTo.split(",").map((s) => s.trim()),
      replyTo: email, // hit "Reply" → answers the lead directly
      subject: `🔴 New brief — ${name}${company !== "—" ? ` (${company})` : ""}`,
      html: `
        <div style="font-family:system-ui,Arial,sans-serif;background:#050505;color:#fff;padding:32px;border-radius:12px;max-width:560px">
          <div style="display:inline-block;background:#D6001C;color:#fff;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:6px 12px;margin-bottom:20px">404 DAMNED — New Lead</div>
          <h2 style="margin:0 0 16px;font-size:22px">${escapeHtml(name)}</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px;color:#ddd">
            <tr><td style="padding:8px 0;color:#888;width:120px">Email</td><td style="padding:8px 0"><a href="mailto:${escapeHtml(email)}" style="color:#FF1A35">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding:8px 0;color:#888">Company</td><td style="padding:8px 0">${escapeHtml(company)}</td></tr>
            <tr><td style="padding:8px 0;color:#888">Service</td><td style="padding:8px 0">${escapeHtml(service)}</td></tr>
            <tr><td style="padding:8px 0;color:#888">Budget</td><td style="padding:8px 0">${escapeHtml(budget)}</td></tr>
          </table>
          <div style="margin-top:20px;padding-top:20px;border-top:1px solid #222">
            <div style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">Their situation</div>
            <div style="font-size:15px;line-height:1.6;white-space:pre-wrap">${safeMessage}</div>
          </div>
        </div>
      `,
      text:
        `New lead — 404 DAMNED\n\n` +
        `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n` +
        `Service: ${service}\nBudget: ${budget}\n\nMessage:\n${message || "—"}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { ok: false, error: "Unexpected error." },
      { status: 500 }
    );
  }
}
