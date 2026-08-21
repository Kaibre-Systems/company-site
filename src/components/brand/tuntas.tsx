import { cn } from "@/lib/utils";

/**
 * The Tuntas identity, as the product ships it.
 *
 * Both marks are the outlined artwork from `brand/tuntas/svg/` in the product
 * repository, with the hardcoded fills replaced by `currentColor` so one
 * asset works on every surface. They are paths rather than live text on
 * purpose: the wordmark is Montserrat Light at 0.14em tracking, and the
 * company site does not load Montserrat — drawing it means the mark is
 * identical to the one on the product's own header, its favicon and its PDFs,
 * with no third webfont on the wire.
 *
 * Identity rule from the product side (17 August 2026 direction): customer-
 * facing Tuntas material carries no "by Kaibre" endorsement lockup. The
 * relationship is stated in words where it belongs — the parent site's
 * product section, the microsite footer — never inside the mark.
 */

/**
 * Both marks take the same accessibility switch. Beside a visible "Tuntas" —
 * in the nav control, in the header lockup — the drawing is decorative and
 * must not announce the name a second time; standing alone it is the name,
 * and carries it.
 */
interface MarkProps {
  className?: string;
  "aria-hidden"?: boolean;
}

function labelling(hidden?: boolean) {
  return hidden
    ? ({ "aria-hidden": true } as const)
    : ({ role: "img", "aria-label": "Tuntas" } as const);
}

/** TUNTAS. Aspect ratio 6.78 : 1; size it with `h-*`. */
export function TuntasWordmark({
  className,
  "aria-hidden": hidden,
}: MarkProps) {
  return (
    <svg
      viewBox="0 0 162.82 24.01"
      {...labelling(hidden)}
      fill="currentColor"
      className={cn("block h-auto w-auto", className)}
    >
      <path d="M8.78 24.01V1.58H0.14V0H19.17V1.58H10.53V24.01Z M37.7 24.18Q33.24 24.18 30.66 21.57Q28.09 18.97 28.09 13.82V0H29.84V13.75Q29.84 18.25 31.9 20.41Q33.96 22.57 37.73 22.57Q41.47 22.57 43.53 20.41Q45.58 18.25 45.58 13.75V0H47.33V13.82Q47.33 18.97 44.76 21.57Q42.19 24.18 37.7 24.18Z M60.3 24.01V0H61.77L78.89 21.85H78.1V0H79.85V24.01H78.41L61.26 2.16H62.05V24.01Z M97.62 24.01V1.58H88.97V0H108.01V1.58H99.37V24.01Z M113.12 24.01 124.17 0H125.92L136.96 24.01H135.07L124.65 1.1H125.4L115.01 24.01ZM117.17 17.25 117.75 15.78H132.12L132.71 17.25Z M152.43 24.18Q149.75 24.18 147.37 23.27Q144.99 22.36 143.68 20.92L144.47 19.62Q145.71 20.89 147.85 21.76Q149.99 22.64 152.39 22.64Q154.8 22.64 156.32 22Q157.85 21.37 158.59 20.31Q159.32 19.24 159.32 17.94Q159.32 16.4 158.5 15.47Q157.68 14.54 156.34 13.99Q155 13.45 153.42 13.07Q151.85 12.69 150.23 12.26Q148.62 11.83 147.28 11.15Q145.95 10.46 145.14 9.28Q144.33 8.09 144.33 6.21Q144.33 4.49 145.23 3.05Q146.12 1.61 148 0.72Q149.89 -0.17 152.84 -0.17Q154.83 -0.17 156.77 0.41Q158.71 0.99 160.08 1.99L159.43 3.4Q157.92 2.37 156.19 1.87Q154.45 1.37 152.84 1.37Q150.54 1.37 149.03 2.02Q147.52 2.68 146.8 3.76Q146.08 4.84 146.08 6.17Q146.08 7.72 146.89 8.64Q147.7 9.57 149.03 10.12Q150.37 10.67 151.98 11.04Q153.6 11.42 155.17 11.85Q156.75 12.28 158.09 12.97Q159.43 13.65 160.25 14.82Q161.07 15.98 161.07 17.84Q161.07 19.52 160.15 20.97Q159.22 22.43 157.32 23.31Q155.41 24.18 152.43 24.18Z" />
    </svg>
  );
}

/**
 * The square mark: a Montserrat SemiBold T, knocked out of a rounded ink
 * square. It exists for the places a wordmark cannot go — here, the one nav
 * control that has to be recognisable at 20px beside two text links.
 *
 * `currentColor` fills the square and the letter is punched through it with
 * an even-odd path, so the mark inverts correctly on any ground without a
 * second asset: on ink it is a pale square with a dark T, on paper the
 * reverse.
 */
export function TuntasMark({ className, "aria-hidden": hidden }: MarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      {...labelling(hidden)}
      fill="currentColor"
      fillRule="evenodd"
      className={cn("block", className)}
    >
      <path d="M14.08 0h35.84A14.08 14.08 0 0 1 64 14.08v35.84A14.08 14.08 0 0 1 49.92 64H14.08A14.08 14.08 0 0 1 0 49.92V14.08A14.08 14.08 0 0 1 14.08 0Zm14.65 49.6h6.54V19.93h11.66V14.4H17.07v5.53h11.66Z" />
    </svg>
  );
}

/**
 * The name in running text, in the product's own treatment.
 *
 * Used only in chrome — the header, the footer attribution — where the name
 * is an identity rather than a word in a sentence. Body copy says "Tuntas"
 * plainly: a page that letterspaced every mention would read as a brand
 * guideline, not as writing.
 */
export function TuntasName({ className }: { className?: string }) {
  return <span className={cn("tuntas-mark", className)}>Tuntas</span>;
}
