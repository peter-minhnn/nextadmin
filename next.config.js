/** @type {import('next').NextConfig} */
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
    // i18n: {
    //     locales: ['en', 'vi'],
    //     defaultLocale: 'en'
    // },
    async rewrites() {
        return [
            {
                source: '/return-policy',
                destination: 'http://localhost:3000/chinh-sach-doi-tra',
            },
        ]
    }
}

module.exports = nextConfig