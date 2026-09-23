"use client";

import { useMemo, useState } from "react";

export function SolarCalculator() {
  const [bill, setBill] = useState(5000);
  const [tariff, setTariff] = useState(9);
  const [offset, setOffset] = useState(70);
  const estimate = useMemo(() => {
    const monthlyUnits = Math.max(0, bill / Math.max(1, tariff));
    const targetUnits = monthlyUnits * (offset / 100);
    const size = targetUnits / 120;
    const annual = targetUnits * 12 * tariff;
    return { size: Math.max(.5, size), annual, targetUnits };
  }, [bill, tariff, offset]);

  return <div className="calculator">
    <div className="form-grid">
      <div className="field"><label htmlFor="bill">Average monthly bill (₹)</label><input id="bill" type="number" min="0" value={bill} onChange={e => setBill(Number(e.target.value))} /></div>
      <div className="field"><label htmlFor="tariff">Average electricity rate (₹/unit)</label><input id="tariff" type="number" min="1" step=".1" value={tariff} onChange={e => setTariff(Number(e.target.value))} /></div>
      <div className="field full"><label htmlFor="offset">Target bill offset: {offset}%</label><input id="offset" type="range" min="20" max="100" step="5" value={offset} onChange={e => setOffset(Number(e.target.value))} /></div>
    </div>
    <div className="estimate" aria-live="polite"><span>Preliminary system-size estimate</span><strong>{estimate.size.toFixed(1)} kW</strong><p>Target solar energy: about {Math.round(estimate.targetUnits)} units/month. Indicative first-year electricity value: ₹{Math.round(estimate.annual).toLocaleString("en-IN")}.</p></div>
    <p className="calc-note">This is an educational estimate, not a quotation or generation guarantee. It uses a broad planning assumption of 120 units per kW per month. Roof, shade, orientation, weather, losses, tariff structure and policy can materially change results.</p>
  </div>;
}
