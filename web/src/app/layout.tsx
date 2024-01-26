import type { Metadata } from 'next';
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

export const runtime = 'edge';

export async function generateMetadata(): Promise<Metadata> {
  const baseURL = new URL(BASE_URL);

  return {
    metadataBase: baseURL,
    title: {
      default: `${SITE_TITLE} - Sudoku Puzzles | Sudokuing`,
      template: '%s - Sudoku Puzzles | Sudokuing ',
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

function GoogleAnalytics() {
  if (!GOOGLE_MEASUREMENT_ID) {
    return <></>;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_MEASUREMENT_ID}');
        `,
        }}
      />
    </>
  );
}

function GoogleGTM() {
  if (!GOOGLE_GTM_ID) {
    return <></>;
  }

  return (
    <Script
      id="gtm"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GOOGLE_GTM_ID}');
      `,
      }}
    />
  );
}

const OpenSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  style: 'normal',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {process.env.NODE_ENV === 'production' && <GoogleAnalytics />}
        {process.env.NODE_ENV === 'production' && <GoogleGTM />}
      </head>

      <body className={`${OpenSans.className}`}>
        <div className="static mb-8 flex h-14 w-full items-center justify-between bg-default-color text-black shadow dark:bg-black dark:text-white">
          <div className="x-container flex items-center justify-between">
            <a href={BASE_URL} title={SITE_TITLE} rel="home">
              <h1 className="text-xl font-bold tracking-wider text-gray-800 no-underline sm:text-2xl">
                {SITE_TITLE}
              </h1>
            </a>
          </div>
        </div>
        <div id="root">{children}</div>
        <div className="x-container post-block mb-12">
          <h2>About Sudoku</h2>
          <p>
            <a
              className="text-blue-600 hover:underline"
              href="https://en.wikipedia.org/wiki/Sudoku"
              rel="nofollow"
              title="Sudoku"
              target="_blank"
            >
              Sudoku
            </a>{' '}
            is a logic-based, combinatorial number-placement puzzle. In classic Sudoku, the
            objective is to fill a 9 x 9 grid with digits so that each column, each row, and each of
            the nine 3 x 3 subgrids that compose the grid contains all of the digits from 1 to 9.
            The puzzle setter provides a partially completed grid, which for a well-posed puzzle has
            a single solution.
          </p>
        </div>
        <div className="x-container post-block mb-12">
          <h2>About {SITE_TITLE}</h2>
          <p>
            <b>Sudokuing (Sudoku'ing)</b> is an online Sudoku gaming website that focuses on
            providing a user-friendly, variety of themed Sudoku puzzles for everyone to enjoy.
          </p>
        </div>
        <footer className="mt-4 w-full bg-gray-800 text-xs text-gray-200 shadow dark:bg-black dark:text-white">
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
                <a
                  className="hover:underline"
                  href={`${BASE_URL}/terms`}
                  rel="nofollow"
                  title="Terms"
                >
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
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
