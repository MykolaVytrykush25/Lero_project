import withSvgr from "next-plugin-svgr";

/** @type {import('next').NextConfig} */
const nextConfig = withSvgr({
  reactStrictMode: false,
  svgrOptions: {
    titleProp: true,
    icon: true,
    svgProps: {
      height: "auto",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eu2.contabostorage.com",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://gemups.com/api/:path*",
      },
    ];
  },
});

export default nextConfig;
