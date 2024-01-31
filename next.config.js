const nextConfig = {
    output: 'export',
    // basePath: '/ride-share',
    reactStrictMode: true,
    trailingSlash: false,
    images: {
        unoptimized: true
    },
    env: {
        MapboxAccessToken: process.env.MAPBOX_ACCESS_TOKEN
    }
};

module.exports = nextConfig;
