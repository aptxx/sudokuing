import { BASE_URL } from '@/config/setting'
import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: []
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}