import { MetadataRoute } from 'next';
import { format, subDays } from 'date-fns';
import { BASE_URL } from '@/config/setting';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = format(subDays(new Date(), 2), 'yyyy-MM-dd');
  let map = [
    {
      url: BASE_URL,
      lastModified: lastModified,
      priority: 1,
    },
  ]

  const _ = ['easy','medium', 'hard', 'expert', 'crazy'].map((difficulty) => {
    map.push({
      url: `${BASE_URL}/${difficulty}`,
      lastModified: lastModified,
      priority: 0.9,
    })
  })

  return map;
}