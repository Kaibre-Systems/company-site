import { chromium } from "@playwright/test";
const url = process.argv[2] ?? "http://localhost:3100/tuntas";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
await p.goto(url, { waitUntil: "networkidle" });
await p.evaluate(() => document.fonts.ready);
const rows = await p.evaluate(() => {
  const out = [];
  const push = (name, el) => {
    const r = el.getBoundingClientRect();
    out.push({ name, h: Math.round(r.height) });
  };
  const header = document.querySelector("header");
  if (header) push("header", header);
  [...document.querySelectorAll("main > section")].forEach((s, i) => {
    const h = s.querySelector("h1,h2,h3");
    push(`${i + 1}. ${(h?.textContent ?? s.id ?? "").slice(0, 34)}`, s);
  });
  const f = document.querySelector("footer");
  if (f) push("footer", f);
  return out;
});
const total = rows.reduce((a, r) => a + r.h, 0);
for (const r of rows) {
  const bar = "█".repeat(Math.round(r.h / 120));
  console.log(String(r.h).padStart(6), (r.h / 844).toFixed(1).padStart(5) + "sc", bar, r.name);
}
console.log("-".repeat(40));
console.log(String(total).padStart(6), (total / 844).toFixed(1) + " screens total");
await b.close();
