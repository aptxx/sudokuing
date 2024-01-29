import { MetadataRoute } from 'next';
import { format, subDays } from 'date-fns';
import { BASE_URL } from '@/config/setting';
import { Difficulty, Theme } from '@/components/sudoku/types';
import { generatePageInfo } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = format(subDays(new Date(), 2), 'yyyy-MM-dd');
  let map = [
    {
      url: BASE_URL,
      lastModified: lastModified,
      priority: 1,
    },
  ]

  for (let theme in Theme) {
    for (let difficulty in Difficulty) {
      const pageinfo = generatePageInfo(theme.toLowerCase() as Theme, difficulty.toLowerCase() as Difficulty);
      map.push({
        url: pageinfo.url,
        lastModified: lastModified,
        priority: 0.9,
      })
    }
  }

  return map;
}