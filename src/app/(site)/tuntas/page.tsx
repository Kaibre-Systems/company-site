import type { Metadata } from "next";
import { TuntasExperience } from "@/components/tuntas/experience";
import { EN } from "@/content/tuntas/en";
import { EN_PATH, ID_PATH } from "@/content/tuntas/locale";

export const metadata: Metadata = {
  title: EN.meta.title,
  description: EN.meta.description,
  alternates: {
    canonical: EN_PATH,
    languages: {
      en: EN_PATH,
      id: ID_PATH,
      "x-default": EN_PATH,
    },
  },
  openGraph: {
    title: `${EN.meta.title} | Kaibre`,
    description: EN.meta.description,
    url: EN_PATH,
    locale: EN.meta.ogLocale,
  },
};

export default function SecurePulseIndonesiaPage() {
  return <TuntasExperience content={EN} />;
}
