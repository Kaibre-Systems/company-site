import { chromium } from "@playwright/test";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
await p.goto("http://localhost:3100/tuntas", { waitUntil: "networkidle" });
await p.evaluate(() => document.fonts.ready);
const rows = await p.evaluate(() => {
  const secs = [...document.querySelectorAll("main > section")];
  const out = [];
  [4, 5].forEach((i) => {
    const s = secs[i];
    const name = (s.querySelector("h2")?.textContent ?? "").slice(0, 20);
    [...s.querySelectorAll(":scope > div > *")].forEach((el, j) => {
      const r = el.getBoundingClientRect();
      out.push({ n: `${name} > child ${j} <${el.tagName.toLowerCase()}>`, h: Math.round(r.height), t: (el.textContent ?? "").replace(/\s+/g," ").slice(0, 40) });
    });
  });
  return out;
});
for (const r of rows) console.log(String(r.h).padStart(5), r.n.padEnd(40), r.t);
await b.close();
