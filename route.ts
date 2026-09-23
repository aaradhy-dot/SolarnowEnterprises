import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const enquirySchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(10).max(20).regex(/^[+()\-\s\d]+$/),
  email: z.string().trim().max(120).email().or(z.literal("")),
  location: z.string().trim().min(2).max(120),
  property: z.enum(["Residential", "Commercial", "Industrial", "Agricultural / remote"]),
  bill: z.string().trim().max(12).regex(/^\d*$/),
  goal: z.string().trim().max(1000),
  consent: z.literal("yes"),
  website: z.string().max(0),
  startedAt: z.string().regex(/^\d{10,15}$/),
});

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] || character);
}

export async function POST(request: Request) {
  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid enquiry data." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(input);
  if (!parsed.success) {
    return NextResponse.json({ message: "Please check the required fields and try again." }, { status: 400 });
  }

  const data = parsed.data;
  const elapsed = Date.now() - Number(data.startedAt);
  if (elapsed < 1500 || elapsed > 86_400_000) {
    return NextResponse.json({ message: "Please refresh the page and submit the form again." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    return NextResponse.json({ message: "Lead delivery is not configured yet." }, { status: 503 });
  }

  const fields = [
    ["Name", data.name],
    ["Phone / WhatsApp", data.phone],
    ["Email", data.email || "Not provided"],
    ["Location", data.location],
    ["Property type", data.property],
    ["Monthly bill", data.bill ? `₹${data.bill}` : "Not provided"],
    ["Requirement", data.goal || "Not provided"],
  ];
  const text = ["New SolarNow website enquiry", "", ...fields.map(([label, value]) => `${label}: ${value}`)].join("\n");
  const html = `<div style="font-family:Arial,sans-serif;line-height:1.55;color:#10162f"><h1 style="font-size:22px">New SolarNow website enquiry</h1><table style="border-collapse:collapse;width:100%;max-width:680px">${fields.map(([label, value]) => `<tr><th style="text-align:left;padding:10px;border:1px solid #dde1d3;background:#f4f6ee">${escapeHtml(label)}</th><td style="padding:10px;border:1px solid #dde1d3">${escapeHtml(value)}</td></tr>`).join("")}</table><p style="color:#666">Submitted from the SolarNow Enterprises website.</p></div>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `solarnow-${crypto.randomUUID()}`,
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `New solar enquiry: ${data.name} — ${data.location}`,
      text,
      html,
      ...(data.email ? { reply_to: data.email } : {}),
      tags: [{ name: "source", value: "website_enquiry" }],
    }),
  });

  if (!response.ok) {
    console.error("Lead email provider rejected the request", { status: response.status });
    return NextResponse.json({ message: "Enquiry could not be delivered right now. Please try again or call us." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
