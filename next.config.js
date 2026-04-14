/** @type {import('next').NextConfig} */
const nextConfig = {
  // 画像最適化の設定
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 90],
  },
}

module.exports = nextConfig
