/** @type {import('next').NextConfig} */

const { NEXT_PUBLIC_ENV } = process.env;
const CONFIG = require(`./lib/configs/${NEXT_PUBLIC_ENV}`);

const nextConfig = {
    reactStrictMode: false,
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    experimental: {
        esmExternals: "loose", // <-- add this
        serverComponentsExternalPackages: ["mongoose"] // <-- and this
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