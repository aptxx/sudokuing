import type { Metadata, Viewport } from 'next';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import {
  BASE_URL,
  GOOGLE_GTM_ID,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_TITLE,
} from '@/config/setting';
import '@/styles/globals.css';
import { GoogleTagManager } from '@next/third-parties/google';
import { FaGithub } from 'react-icons/fa';

export async function generateMetadata(): Promise<Metadata> {
  const baseURL = new URL(BASE_URL);

  return {
    metadataBase: baseURL,
    title: {
      default: 'Free Sudoku Online — Classic, Alphabet & Color Sudoku | Sudokuing',
      template: '%s | Sudokuing',
    },
    keywords: SITE_KEYWORDS,
    description: SITE_DESCRIPTION,
    authors: [{ name: baseURL.host, url: BASE_URL }],
    robots: 'index',
    manifest: '/manifest.json',
    openGraph: {
      type: 'website',
      title: SITE_TITLE,
      locale: 'en_US',
      url: BASE_URL,
      description: SITE_DESCRIPTION,
    },
    twitter: {
      card: 'summary_large_image',
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

const DynamicDarkmodeSwitch = dynamic(() => import('@/components/common/DarkmodeSwitch'), {
  loading: () => <span>Dark Mode</span>,
});

const Header = () => {
  return (
    <div className="static flex h-14 w-full items-center justify-between bg-default-color text-black shadow dark:bg-black dark:text-gray-200">
      <div className="x-container flex w-full items-center justify-between">
        <div className="flex items-center justify-between gap-2 font-bold">
          <a href={BASE_URL} title={SITE_TITLE} rel="home">
            <span className="text-xl tracking-wider no-underline sm:text-2xl">{SITE_TITLE}</span>
          </a>
          <a href={`${BASE_URL}/easy`} title="Classic Sudoku">
            <span className="text-sm tracking-wider no-underline">Classic</span>
          </a>
          <a href={`${BASE_URL}/alphabet/easy`} title="Alphabet Sudoku">
            <span className="text-sm tracking-wider no-underline">Alphabet</span>
          </a>
          <a href={`${BASE_URL}/color/easy`} title="Color Sudoku">
            <span className="text-sm tracking-wider no-underline">Color</span>
          </a>
        </div>
        <div className="flex items-center justify-between gap-1">
          <a
            href="https://github.com/aptxx/sudokuing"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
          >
            <FaGithub size={'20'} />
          </a>
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Set the theme class before first paint to avoid a light-mode flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var s=localStorage.getItem('color-scheme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d){document.documentElement.classList.add('dark')}}catch(e){}`,
          }}
        />
        <GoogleTagManager gtmId={GOOGLE_GTM_ID} />
        <Script
          id="google-gpt"
          strategy="lazyOnload"
          src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        />
        <Script
          id="google-gpt-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var googletag = window.googletag || { cmd: [] }
          `,
          }}
        />
      </head>

      <body className={`dark:bg-black dark:text-gray-200`}>
        <Header />
        <div id="root" className="mt-4">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
