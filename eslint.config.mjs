import coreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/**
 * Flat config. `eslint-config-next` v16 ships native flat configs, so the old
 * FlatCompat bridge (and its `@eslint/eslintrc` dependency) is gone.
 */
const eslintConfig = [
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },

  ...coreWebVitals,
  ...nextTypescript,

  {
    files: ["src/**/*.{ts,tsx}"],
    // `raw-colors.ts` is the single documented home for literal values, for the
    // two contexts that cannot read CSS variables (themeColor meta, next/og).
    ignores: ["src/lib/raw-colors.ts"],
    rules: {
      /**
       * The design system is the only place colours are defined. Raw hex in a
       * component is how the previous site accumulated 156 hardcoded values
       * across two conflicting oranges — this stops that recurring.
       */
      "no-restricted-syntax": [
        "error",
        {
          selector: "Literal[value=/#(?:[0-9a-fA-F]{3}){1,2}\\b/]",
          message:
            "No raw hex colours in components. Use a semantic token from globals.css (bg-surface, text-fg, border-border, text-accent, ...).",
        },
      ],
    },
  },
];

export default eslintConfig;
