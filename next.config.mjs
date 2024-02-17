const nextConfig = {
    typescript: {
        // added option due to some bugs with prisma
        ignoreBuildErrors: true,
    },
    env: {
        MapboxAccessToken: process.env.MAPBOX_ACCESS_TOKEN,
        NEXT_AUTH_URL: process.env.NEXT_AUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        GA_MEASUREMENT_ID: process.env.GA_MEASUREMENT_ID
    }
};

export default nextConfig;
