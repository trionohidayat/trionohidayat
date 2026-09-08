import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://trionohidayat.vercel.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/resume', '/resume/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
