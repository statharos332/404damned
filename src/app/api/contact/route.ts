import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * ============================================================
 *  404 DAMNED — Contact form → email  (Resend, Vercel-ready)
 * ============================================================
 *  Sends every submission to your inbox via Resend.
 *  Set these in Vercel → Project → Settings → Environment Variables:
 *    RESEND_API_KEY   = re_xxxxxxxxxxxxxxxx
 *    CONTACT_TO       = where leads land (e.g. hello@404damned.nl)
 *    CONTACT_FROM     = a verified sender on your domain
 *                       (e.g. "404 DAMNED <noreply@404damned.nl>")
 *  See VIDEO/EMAIL guide for the 2-minute setup.
 * ============================================================
 */

const resend = new Resend(process.env.RESEND_API_KEY);

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
    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO || !process.env.CONTACT_FROM) {
      console.error("Contact form: missing RESEND_API_KEY / CONTACT_TO / CONTACT_FROM env vars.");
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
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM,
      to: process.env.CONTACT_TO.split(",").map((s) => s.trim()),
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

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "Could not send. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { ok: false, error: "Unexpected error." },
      { status: 500 }
    );
  }
}
