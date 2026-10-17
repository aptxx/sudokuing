import { Metadata } from 'next';
import { Difficulty, Theme } from '@/components/sudoku/types';
import { capitalize } from './utils';
import { difficultyContent } from './content';
import { BASE_URL, SITE_KEYWORDS, SITE_TITLE } from '@/config/setting';

export type PageInfo = {
  title: string;
  keywords: string;
  description: string;
  url: string;
};

export function generatePageInfo(theme: Theme, difficulty: Difficulty): PageInfo {
  const themeCap = capitalize(theme);
  const difficultyCap = capitalize(difficulty);

  return {
    title: `${themeCap} Sudoku ${difficultyCap} - Play Free Online`,
    keywords: `${SITE_KEYWORDS}, ${themeCap} Sudoku, Sudoku ${difficultyCap}`,
    description: `${themeCap} Sudoku ${difficultyCap} — ${difficultyContent[difficulty].meta}. Free online, no download, no signup, one guaranteed solution.`,
    url:
      theme === Theme.Classic ? `${BASE_URL}/${difficulty}` : `${BASE_URL}/${theme}/${difficulty}`,
  };
}

export function generateBaseMetadata(theme: Theme, difficulty: Difficulty): Metadata {
  const pageinfo = generatePageInfo(theme, difficulty);
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
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: pageinfo.title }],
    },
    alternates: {
      canonical: pageinfo.url,
    },
  };
}

export function generateLinkedData(theme: Theme, difficulty: Difficulty) {
  const pageinfo = generatePageInfo(theme, difficulty);
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: pageinfo.title,
    description: pageinfo.description,
    url: pageinfo.url,
    genre: ['Puzzle', 'Logic'],
    gamePlatform: 'Web Browser',
    playMode: 'SinglePlayer',
    applicationCategory: 'Game',
    operatingSystem: 'Any',
    isAccessibleForFree: true,
    publisher: {
      '@type': 'Organization',
      name: SITE_TITLE,
      url: BASE_URL,
    },
  };
}
