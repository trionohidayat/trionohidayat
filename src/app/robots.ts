import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://trionohidayat.my.id';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/resume', '/resume/*', '/download', '/download/*'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
