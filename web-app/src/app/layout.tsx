/* eslint-disable @next/next/no-page-custom-font */
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <title>Pin Point Score</title>
        <meta name="title" content="pinpointscore" />
        <meta
          name="description"
          content="Tee box to green, track your golf game with ease"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pinpointscore.golf/" />
        <meta property="og:title" content="pinpointscore" />
        <meta
          property="og:description"
          content="Tee box to green, track your golf game with ease"
        />
        <meta
          property="og:image"
          content="https://pinpointscore.golf/pinpointscore.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://pinpointscore.golf/" />
        <meta property="twitter:title" content="pinpointscore" />
        <meta
          property="twitter:description"
          content="Tee box to green, track your golf game with ease"
        />
        <meta
          property="twitter:image"
          content="https://pinpointscore.golf/pinpointscore.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://pinpointscore.golf/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://pinpointscore.golf/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="https://pinpointscore.golf/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />

        <link
          href="https://fonts.googleapis.com/css2?family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="max-w-xl mt-[9vh] mx-9 lg:mx-auto">
        <main className="flex flex-col flex-auto min-w-0 mt-6 px-2 md:px-0">
          {children}
        </main>
      </body>
    </html>
  );
}
