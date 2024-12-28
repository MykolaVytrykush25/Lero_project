import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { ToastProvider } from "@/components/ToastProvider";

// Components
import I18nextProviderWrapper from "@/components/I18NextProvider";
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";
import ReduxStoreProvider from "@/components/ReduxStoreProvider";

// Styles
import "@/scss/main.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "GEMUPS",
  description:
    "You can buy proxies and social network accounts from us. Account quality guarantee. Fast support.",
  icons: {
    icon: [
      { rel: "apple-touch-icon", sizes: "180x180", url: "/favicon/apple-touch-icon.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", url: "/favicon/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", url: "/favicon/favicon-16x16.png" },
    ],
  },
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <I18nextProviderWrapper>
          <ThemeProviderWrapper>
            <ReduxStoreProvider>
              <ToastProvider>{children}</ToastProvider>
            </ReduxStoreProvider>
          </ThemeProviderWrapper>
        </I18nextProviderWrapper>
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
};

export default RootLayout;
