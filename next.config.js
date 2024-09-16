/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'hlsqynuporoplqsmbmwv.supabase.co',
                port: '',
                pathname: '/**',
            },
        ],
    }
};

module.exports = nextConfig;
