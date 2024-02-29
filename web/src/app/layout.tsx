import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Open_Sans } from 'next/font/google';
import Script from 'next/script';
import {
  BASE_URL,
  GOOGLE_GTM_ID,
  GOOGLE_MEASUREMENT_ID,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_TITLE,
} from '@/config/setting';
import '@/styles/globals.css';
import GoogleAnalytics from '@/components/common/google/GoogleAnalytics';
import GoogleGTM from '@/components/common/google/GoogleGTM';

export const runtime = 'edge';

export async function generateMetadata(): Promise<Metadata> {
  const baseURL = new URL(BASE_URL);

  return {
    metadataBase: baseURL,
    title: {
      default: `${SITE_TITLE} - Free Sudoku Online | Sudokuing`,
      template: '%s - Free Sudoku Online | Sudokuing',
    },
    keywords: SITE_KEYWORDS,
    description: SITE_DESCRIPTION,
    authors: [{ name: baseURL.host, url: BASE_URL }],
    viewport: 'width=device-width, initial-scale=1',
    robots: 'index',
    themeColor: '#FFFFFF',
    manifest: '/manifest.json',
    openGraph: {
      type: 'website',
      title: SITE_TITLE,
      locale: 'en_US',
      url: BASE_URL,
      description: SITE_DESCRIPTION,
    },
    appleWebApp: {
      title: SITE_TITLE,
      capable: true,
      statusBarStyle: 'default',
    },
    icons: [
      { rel: 'icon', url: '/favicon.ico', type: 'image/x-icon' },
      { rel: 'shortcut icon', url: '/favicon.ico', type: 'image/x-icon' },
      { rel: 'apple-touch-icon', url: '/apple-touch-icon.png' },
    ],
  };
}

const OpenSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  style: 'normal',
});

const DynamicDarkmodeSwitch = dynamic(() => import('@/components/common/DarkmodeSwitch'), {
  loading: () => <span>Dark Mode</span>,
});

const Header = () => {
  return (
    <div className="static flex h-14 w-full items-center justify-between bg-default-color text-black shadow dark:bg-black dark:text-gray-200">
      <div className="x-container flex w-full items-center justify-between">
        <div className="flex items-center justify-between font-bold">
          <a href={BASE_URL} title={SITE_TITLE} rel="home">
            <span className="text-xl tracking-wider no-underline sm:text-2xl">{SITE_TITLE}</span>
          </a>
          <a href={`${BASE_URL}/easy`} title={SITE_TITLE} rel="Classic Sudoku">
            <span className="ml-4 text-sm tracking-wider no-underline">Classic</span>
          </a>
          <a href={`${BASE_URL}/alphabet/easy`} title={SITE_TITLE} rel="Alphabet Sudoku">
            <span className="ml-4 text-sm tracking-wider no-underline">Alphabet</span>
          </a>
          <a href={`${BASE_URL}/color/easy`} title={SITE_TITLE} rel="Color Sudoku">
            <span className="ml-4 text-sm tracking-wider no-underline">Color</span>
          </a>
        </div>
        <div>
          <DynamicDarkmodeSwitch />
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="mt-4 w-full bg-gray-800 text-xs text-gray-200 shadow dark:bg-black dark:text-gray-200">
      <div className="mx-2 flex items-center justify-between py-2 sm:mx-8 md:mx-32">
        <div>
          <span>© {SITE_TITLE}</span>
        </div>
        <div>
          <span>
            <a
              className="hover:underline"
              href={`${BASE_URL}/privacy`}
              rel="nofollow"
              title="Privacy"
            >
              Privacy
            </a>
          </span>
          <span className="ml-4">
            <a className="hover:underline" href={`${BASE_URL}/terms`} rel="nofollow" title="Terms">
              Terms
            </a>
          </span>
          <span className="ml-4">
            <a
              className="hover:underline"
              href="mailto:support@sudokuing.com"
              rel="nofollow"
              title="Contact Us"
            >
              Contact Us
            </a>
          </span>
          <span className="ml-4">
            <a
              className="hover:underline"
              href={`${BASE_URL}/aboutus`}
              rel="nofollow"
              title="About Us"
            >
              About Us
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {process.env.NODE_ENV === 'production' && (
          <GoogleAnalytics measurementID={GOOGLE_MEASUREMENT_ID} />
        )}
        {process.env.NODE_ENV === 'production' && <GoogleGTM gtmID={GOOGLE_GTM_ID} />}
        {process.env.NODE_ENV === 'production' && (
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3943160950859903"
            crossOrigin="anonymous"
          />
        )}
      </head>

      <body className={`${OpenSans.className} dark:bg-black dark:text-gray-200`}>
        <Header />
        <div id="root" className="mt-4">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
