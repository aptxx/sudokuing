import Script from 'next/script';

export default function GoogleAnalytics({
  measurementID = '',
}: {
  measurementID?: string | undefined;
}) {
  if (!measurementID) {
    return <></>;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementID}`}
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
          gtag('config', '${measurementID}');
        `,
        }}
      />
    </>
  );
}
