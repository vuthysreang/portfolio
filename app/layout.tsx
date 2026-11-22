import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vuthy Sreang — Full-stack developer",
  description:
    "Vuthy Sreang is a full-stack developer in Phnom Penh, Cambodia, with experience in insurance platforms, mobile apps, and payment integrations. Explore his work and CV.",
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
};
const setTheme = `try{const saved=localStorage.getItem("vuthy-theme");document.documentElement.dataset.theme=saved==="light"||saved==="dark"?saved:(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")}catch{}`;

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: setTheme }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
