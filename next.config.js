/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      { source: '/easy', destination: '/classic/easy' },
      { source: '/medium', destination: '/classic/medium' },
      { source: '/hard', destination: '/classic/hard' },
      { source: '/expert', destination: '/classic/expert' },
      { source: '/crazy', destination: '/classic/crazy' },
    ];
  },
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
