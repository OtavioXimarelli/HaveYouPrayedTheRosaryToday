import type {MetadataRoute} from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Evangelizae — oração para a vida cotidiana',
    short_name: 'Evangelizae',
    description: 'Rosário guiado e liturgia diária em uma experiência católica serena.',
    start_url: '/pt/sanctuary',
    display: 'standalone',
    background_color: '#f4efe6',
    theme_color: '#7a2e35',
    lang: 'pt-BR',
    categories: ['lifestyle', 'education'],
    icons: [
      {src: '/evangelizae-seal.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any'},
      {src: '/evangelizae-seal-maskable.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable'},
    ],
  };
}
