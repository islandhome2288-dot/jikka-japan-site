import { MetadataRoute } from 'next'

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://jikka-japan-site.vercel.app'

const langs = ['ja', 'en']

const pages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '',            priority: 1.0, changeFrequency: 'weekly'  },
  { path: '/reservation',priority: 0.9, changeFrequency: 'weekly'  },
  { path: '/rooms',      priority: 0.8, changeFrequency: 'monthly' },
  { path: '/access',     priority: 0.7, changeFrequency: 'monthly' },
  { path: '/faq',        priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact',    priority: 0.6, changeFrequency: 'monthly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const lang of langs) {
    for (const page of pages) {
      entries.push({
        url: `${BASE_URL}/${lang}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      })
    }
  }

  return entries
}
