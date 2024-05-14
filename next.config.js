module.exports = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_MAPBOX_API_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN
  },
  images: {
    domains: ['res.cloudinary.com'],
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
}
