import type { NextConfig } from "next";

const pages = process.env.GITHUB_PAGES === "true";
const config: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: ["127.0.0.1"],
  ...(pages && {
    output: "export",
    basePath: "/portfolio",
    trailingSlash: true,
  }),
};
export default config;
