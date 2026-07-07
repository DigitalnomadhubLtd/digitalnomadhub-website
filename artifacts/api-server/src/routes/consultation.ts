import { Router, type IRouter } from "express";
import { ReplitConnectors } from "@replit/connectors-sdk";
import { logger } from "../lib/logger";

const router: IRouter = Router();

interface ConsultationBody {
  name: string;
  email: string;
  company: string;
  projectDescription: string;
  services: string[];
  budget: string;
  timeline: string;
}

router.post("/consultation", async (req, res): Promise<void> => {
  const {
    name,
    email,
    company,
    projectDescription,
    services,
    budget,
    timeline,
  } = req.body as ConsultationBody;

  if (!name || !email || !projectDescription || !budget || !timeline) {
    res.status(400).json({ error: "Missing required fields." });
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: "Invalid email address." });
    return;
  }

  const serviceList =
    Array.isArray(services) && services.length > 0
      ? services.join(", ")
      : "Not specified";

  const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: #06152D; color: #e2e8f0; margin: 0; padding: 40px 20px; }
    .card { background: #0b2352; border: 1px solid #1e3a6e; border-radius: 16px; max-width: 600px; margin: 0 auto; padding: 40px; }
    .logo { font-size: 22px; font-weight: 700; color: #3B82F6; letter-spacing: -0.5px; margin-bottom: 32px; }
    h1 { font-size: 24px; font-weight: 700; margin: 0 0 8px; color: #fff; }
    .subtitle { color: #94a3b8; font-size: 14px; margin-bottom: 32px; }
    .field { margin-bottom: 20px; }
    .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #3B82F6; margin-bottom: 4px; }
    .value { font-size: 15px; color: #e2e8f0; line-height: 1.6; }
    .divider { border: none; border-top: 1px solid #1e3a6e; margin: 24px 0; }
    .footer { font-size: 12px; color: #475569; margin-top: 32px; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">DNH.</div>
    <h1>New Consultation Request</h1>
    <p class="subtitle">Submitted via digitalnomadhub.online</p>
    <hr class="divider" />
    <div class="field"><div class="label">Name</div><div class="value">${name}</div></div>
    <div class="field"><div class="label">Email</div><div class="value">${email}</div></div>
    <div class="field"><div class="label">Company</div><div class="value">${company || "Not provided"}</div></div>
    <hr class="divider" />
    <div class="field"><div class="label">Project Description</div><div class="value">${projectDescription.replace(/\n/g, "<br/>")}</div></div>
    <div class="field"><div class="label">Services Required</div><div class="value">${serviceList}</div></div>
    <div class="field"><div class="label">Estimated Budget</div><div class="value">${budget}</div></div>
    <div class="field"><div class="label">Preferred Timeline</div><div class="value">${timeline}</div></div>
    <hr class="divider" />
    <div class="footer">Digital Nomad Hub Ltd &mdash; hello@digitalnomadhub.online</div>
  </div>
</body>
</html>
  `.trim();

  // Use Resend's shared sender until digitalnomadhub.online domain is verified at resend.com/domains.
  // Once DNS records are verified, update FROM to: Digital Nomad Hub <hello@digitalnomadhub.online>
  const verifiedFrom = process.env.RESEND_VERIFIED_FROM ?? "Digital Nomad Hub <onboarding@resend.dev>";

  try {
    const connectors = new ReplitConnectors();
    const response = await connectors.proxy("resend", "/emails", {
      method: "POST",
      body: JSON.stringify({
        from: verifiedFrom,
        to: ["hello@digitalnomadhub.online"],
        reply_to: email,
        subject: `New Consultation: ${name}${company ? ` — ${company}` : ""}`,
        html: htmlBody,
      }),
    });

    const responseText = await response.text();

    if (!response.ok) {
      req.log.error(
        { status: response.status, resendResponse: responseText },
        "Resend API rejected the request"
      );
      res.status(502).json({ error: "Failed to send email. Please try again or contact us directly at hello@digitalnomadhub.online." });
      return;
    }

    req.log.info({ name, email, resendResponse: responseText }, "Consultation email sent successfully");
    res.status(200).json({ success: true });
  } catch (err) {
    logger.error({ err }, "Unexpected error sending consultation email");
    res.status(500).json({ error: "An unexpected error occurred." });
  }
});

export default router;
