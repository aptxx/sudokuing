import { MetadataRoute } from 'next';
import { BASE_URL } from '@/config/setting';
import { Difficulty, Theme } from '@/components/sudoku/types';
import { generatePageInfo } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  // Regenerated at build time, so it reflects the last deploy.
  const lastModified = new Date();
  let map = [
    {
      url: BASE_URL,
      lastModified: lastModified,
      priority: 1,
    },
  ];

  for (let theme in Theme) {
    for (let difficulty in Difficulty) {
      const pageinfo = generatePageInfo(
        theme.toLowerCase() as Theme,
        difficulty.toLowerCase() as Difficulty
      );
      map.push({
        url: pageinfo.url,
        lastModified: lastModified,
        priority: 0.9,
      });
    }
  }

  return map;
}
