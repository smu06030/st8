import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Moa',
    short_name: 'Moa',
    description: 'Stamp Moa',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/app-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/app-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  };
}
