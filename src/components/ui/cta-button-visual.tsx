import React from "react";

interface CTAButtonVisualProps {
  buttonText: string;
  className?: string;
}

/**
 * Renders the brand CTA-button look as plain <span>s (no <button>, no <a>).
 * Use inside a parent that is already an interactive element (e.g. a card-
 * sized <Link>) to avoid nested-interactive a11y violations.
 */
const CTAButtonVisual: React.FC<CTAButtonVisualProps> = ({
  buttonText,
  className = "",
}) => {
  return (
    <span
      aria-hidden="true"
      className={`relative inline-flex h-12 w-64 overflow-hidden rounded-xl p-[1px] ${className}`}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#CD4813_50%,#E2CBFF_100%)] rounded-xl" />
      <span className="inline-flex h-full w-full items-center justify-center rounded-xl bg-slate-950 px-3 py-1 text-lg font-bold text-white backdrop-blur-3xl font-supreme">
        {buttonText}
      </span>
    </span>
  );
};

export default CTAButtonVisual;
