import { linguiMacroSwcPlugin } from '@lingui/swc-plugin/options';

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.1.128'],
  experimental: {
    inlineCss: true,
    swcPlugins: [linguiMacroSwcPlugin()],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
