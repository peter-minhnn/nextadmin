/** @type {import('next').NextConfig} */

const { NEXT_PUBLIC_ENV } = process.env;
const CONFIG = require(`./api/configs/${NEXT_PUBLIC_ENV}`);

const nextConfig = {
    reactStrictMode: false,
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '2mb',
        },
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${CONFIG.NEXT_PUBLIC_API_URL_BASE}/api/:path*`,
            }
        ];
    }
}

module.exports = nextConfig