declare module "next-plugin-svgr" {
	import { NextConfig } from "next";
	const withSvgr: (nextConfig: NextConfig) => NextConfig;
	export default withSvgr;
}
