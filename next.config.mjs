
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      // Fotos subidas desde /admin (Supabase Storage)
      { protocol: 'https', hostname: '*.supabase.co' }
    ]
  },
  experimental: { serverActions: { bodySizeLimit: '2mb' } }
}
export default nextConfig
