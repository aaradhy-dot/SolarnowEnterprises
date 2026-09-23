"use client";

import { FormEvent, useEffect, useState } from "react";

type SubmitState = "idle" | "sending" | "sent" | "fallback" | "error";

function buildSummary(data: FormData) {
  return [
    "SolarNow solar enquiry",
    `Name: ${data.get("name") || ""}`,
    `Phone: ${data.get("phone") || ""}`,
    `Email: ${data.get("email") || "Not provided"}`,
    `Location: ${data.get("location") || ""}`,
    `Property: ${data.get("property") || ""}`,
    `Monthly bill: Rs. ${data.get("bill") || "Not provided"}`,
    `Requirement: ${data.get("goal") || "Not provided"}`,
  ].join("\n");
}

export function EnquiryPrep({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const [startedAt, setStartedAt] = useState("");

  useEffect(() => {
    setStartedAt(Date.now().toString());
  }, []);

  async function copyFallback(summary: string) {
    try {
      await navigator.clipboard.writeText(summary);
      setState("fallback");
      setMessage("Online delivery abhi configure nahi hai. Enquiry copy ho gayi hai—isse phone ya WhatsApp par SolarNow team ko bhej dein.");
    } catch {
      setState("error");
      setMessage("Enquiry send nahi hui. Kripya details note karke SolarNow team ko call karein.");
    }
  }

  async function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const summary = buildSummary(data);
    setState("sending");
    setMessage("Enquiry bheji ja rahi hai…");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      const result = await response.json().catch(() => ({})) as { message?: string };

      if (response.ok) {
        setState("sent");
        setMessage("Thank you! Aapki enquiry SolarNow team ko mil gayi hai. Team aapse jald contact karegi.");
        form.reset();
        setStartedAt(Date.now().toString());
        return;
      }

      if (response.status === 503) {
        await copyFallback(summary);
        return;
      }

      setState("error");
      setMessage(result.message || "Enquiry send nahi ho saki. Details check karke dobara try karein.");
    } catch {
      await copyFallback(summary);
    }
  }

  return <form className={`calculator lead-form${compact ? " compact" : ""}`} onSubmit={submitEnquiry}>
    <input type="hidden" name="startedAt" value={startedAt} />
    <div className="trap-field" aria-hidden="true"><label htmlFor={compact ? "website-home" : "website"}>Website</label><input id={compact ? "website-home" : "website"} name="website" tabIndex={-1} autoComplete="off" /></div>
    <div className="form-grid">
      <div className="field"><label htmlFor={compact ? "name-home" : "name"}>Full name *</label><input id={compact ? "name-home" : "name"} name="name" required minLength={2} maxLength={80} autoComplete="name" /></div>
      <div className="field"><label htmlFor={compact ? "phone-home" : "phone"}>Phone / WhatsApp *</label><input id={compact ? "phone-home" : "phone"} name="phone" type="tel" required minLength={10} maxLength={20} inputMode="tel" autoComplete="tel" placeholder="+91 98XXXXXXXX" /></div>
      <div className="field"><label htmlFor={compact ? "email-home" : "email"}>Email (optional)</label><input id={compact ? "email-home" : "email"} name="email" type="email" maxLength={120} autoComplete="email" /></div>
      <div className="field"><label htmlFor={compact ? "location-home" : "location"}>Property location *</label><input id={compact ? "location-home" : "location"} name="location" required minLength={2} maxLength={120} autoComplete="address-level2" placeholder="Area, city" /></div>
      <div className="field"><label htmlFor={compact ? "property-home" : "property"}>Property type *</label><select id={compact ? "property-home" : "property"} name="property" required defaultValue="Residential"><option>Residential</option><option>Commercial</option><option>Industrial</option><option>Agricultural / remote</option></select></div>
      <div className="field"><label htmlFor={compact ? "bill-home" : "bill"}>Approx. monthly bill (₹)</label><input id={compact ? "bill-home" : "bill"} name="bill" type="number" min="0" max="10000000" inputMode="numeric" /></div>
      <div className="field full"><label htmlFor={compact ? "goal-home" : "goal"}>What do you need?</label><textarea id={compact ? "goal-home" : "goal"} name="goal" rows={compact ? 3 : 4} maxLength={1000} placeholder="Lower bills, rooftop solar, backup, or another requirement" /></div>
      <label className="consent-field field full"><input name="consent" type="checkbox" value="yes" required /><span>I agree that SolarNow Enterprises may contact me about this enquiry. *</span></label>
    </div>
    <button className="button button-dark" type="submit" disabled={state === "sending" || !startedAt}>{state === "sending" ? "Sending…" : "Get my solar consultation"}</button>
    {message && <p className={`form-message ${state}`} role="status" aria-live="polite">{message}</p>}
    <p className="calc-note">Please do not submit passwords, identity documents or payment details. Fields marked * are required.</p>
  </form>;
}
