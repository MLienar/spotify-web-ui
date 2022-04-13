/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'i.scdn.co',
      'blend-playlist-covers.spotifycdn.com',
      'mosaic.scdn.co',
      'daily-mix.scdn.co',
      'newjams-images.scdn.co',
      'seeded-session-images.scdn.co',
      'thisis-images.scdn.co',
      'lineup-images.scdn.co',
    ],
  },
}

module.exports = nextConfig
