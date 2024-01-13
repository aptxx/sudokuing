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
    }
  ]

  return map;
}