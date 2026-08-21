import { chromium } from "@playwright/test";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3100/tuntas", { waitUntil: "networkidle" });
const out = await p.evaluate(() => {
  const headings = [...document.querySelectorAll("main h3")];
  const lists = headings.filter((el) => /(?:You give Tuntas|Tuntas returns)/.test(el.textContent ?? ""));
  const rows = lists.flatMap((h) => [...(h.parentElement?.querySelectorAll("li") ?? [])]);
  return rows.map((row) => {
    const icon = row.children[0].getBoundingClientRect();
    const text = [...row.children].slice(1).map((el) => el.getBoundingClientRect());
    const top = Math.min(...text.map((r) => r.top));
    const bottom = Math.max(...text.map((r) => r.bottom));
    return {
      label: (row.children[1].textContent ?? "").slice(0, 26),
      lines: Math.round((bottom - top) / 26),
      delta: +(icon.top + icon.height / 2 - (top + bottom) / 2).toFixed(2),
    };
  });
});
console.log(JSON.stringify(out, null, 1));
await b.close();
