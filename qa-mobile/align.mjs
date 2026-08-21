import { chromium } from "@playwright/test";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3100/tuntas", { waitUntil: "networkidle" });
const out = await p.evaluate(() => {
  const centre = (el) => { const r = el.getBoundingClientRect(); return +(r.top + r.height / 2).toFixed(2); };
  const header = document.querySelector("header");
  const svg = header.querySelector("svg");
  const spans = [...header.querySelectorAll("span")].filter((s) => s.textContent.trim() && s.children.length === 0);
  const icons = [...document.querySelectorAll("main li")]
    .filter((li) => li.children.length >= 2 && li.children[0].tagName === "SPAN" && li.children[0].querySelector("svg"))
    .slice(0, 8)
    .map((li) => ({
      label: li.children[1].textContent.slice(0, 28),
      delta: +(centre(li.children[0]) - centre(li.children[1])).toFixed(2),
    }));
  return {
    wordmark: centre(svg),
    labels: spans.slice(0, 3).map((s) => ({ t: s.textContent.trim().slice(0, 22), c: centre(s) })),
    icons,
  };
});
console.log(JSON.stringify(out, null, 1));
await b.close();
