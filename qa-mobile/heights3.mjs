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
    const tag = (s.querySelector("h2")?.textContent ?? "").slice(0, 14);
    const walk = (el, d) => {
      for (const c of el.children) {
        const r = c.getBoundingClientRect();
        if (r.height < 60) continue;
        out.push({ h: Math.round(r.height), d, t: tag + " | " + "  ".repeat(d) + c.tagName.toLowerCase() + " " + (c.textContent ?? "").replace(/\s+/g, " ").slice(0, 46) });
        if (d < 2) walk(c, d + 1);
      }
    };
    walk(s.querySelector(":scope > div > div") ?? s, 0);
  });
  return out;
});
for (const r of rows) console.log(String(r.h).padStart(5), r.t);
await b.close();
