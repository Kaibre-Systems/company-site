"use client";

import { useEffect } from "react";

/**
 * Keeps `<html lang>` correct across client-side navigation.
 *
 * The inline script in the experience handles the full-load case before
 * paint, but React does not execute script tags it re-renders during a soft
 * navigation — so toggling locale via the header would leave the previous
 * page's language on the root element without this effect.
 */
export function LangSync({ lang }: { lang: "en" | "id" }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
