import { Metadata } from "next";
import { Difficulty, Theme } from "@/components/sudoku/types";
import { capitalize } from "./utils";
import { BASE_URL, SITE_DESCRIPTION, SITE_KEYWORDS } from "@/config/setting";

export type PageInfo = {
  title: string,
  keywords: string,
  description: string,
  url:  string,
}

export function generatePageInfo(theme: Theme, difficulty: Difficulty): PageInfo {
  const themeCap = capitalize(theme);
  const difficultyCap = capitalize(difficulty);

  return {
    title: `${difficultyCap} ${themeCap}`,
    keywords: `${SITE_KEYWORDS}, ${themeCap} Sudoku, ${difficultyCap} Sudoku`,
    description: `${difficultyCap} ${themeCap} Sudoku - ${SITE_DESCRIPTION}`,
    url: theme === Theme.Classic ? `${BASE_URL}/${difficulty}` : `${BASE_URL}/${theme}/${difficulty}`
  }
}

export function generateBaseMetadata(theme: Theme, difficulty: Difficulty): Metadata {
  const pageinfo = generatePageInfo(theme, difficulty as Difficulty);
  return {
    title: pageinfo.title,
    keywords: pageinfo.keywords,
    description: pageinfo.description,
    openGraph: {
      type: 'website',
      title: pageinfo.title,
      locale: 'en_US',
      url: pageinfo.url,
      description: pageinfo.description,
    },
    alternates: {
      canonical: pageinfo.url,
    },
  };
}

export function generateIinkedData(theme: Theme, difficulty: Difficulty): any {
  const pageinfo = generatePageInfo(theme, difficulty);
  return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: pageinfo.title,
      description: pageinfo.description,
      operatingSystem: 'any',
      offers: {
        '@type': 'Offer',
        category: 'free',
        price: 0,
        priceCurrency: 'USD',
    }
  }
}