import type { Metadata } from "next";
import { IndonesiaExperience } from "@/components/indonesia/experience";
import { EN } from "@/content/indonesia/en";
import { EN_PATH, ID_PATH } from "@/content/indonesia/locale";

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

export default function SecurePulsIndonesiaPage() {
  return <IndonesiaExperience content={EN} />;
}
