import type { Metadata } from "next";
import { TuntasExperience } from "@/components/tuntas/experience";
import { ID } from "@/content/tuntas/id";
import { EN_PATH, ID_PATH } from "@/content/tuntas/locale";

export const metadata: Metadata = {
  title: ID.meta.title,
  description: ID.meta.description,
  alternates: {
    canonical: ID_PATH,
    languages: {
      en: EN_PATH,
      id: ID_PATH,
      "x-default": EN_PATH,
    },
  },
  openGraph: {
    title: `${ID.meta.title} | Kaibre`,
    description: ID.meta.description,
    url: ID_PATH,
    locale: ID.meta.ogLocale,
  },
};

export default function SecurePulseIndonesiaIdPage() {
  return <TuntasExperience content={ID} />;
}
