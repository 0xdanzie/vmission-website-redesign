import type { Metadata } from 'next';
import './globals.css';
import { AudioPlayerProvider } from '@/context/AudioPlayerContext';
import { ToastProvider } from '@/context/ToastContext';
import { DataProvider } from '@/context/DataContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AudioPlayerDock from '@/components/AudioPlayerDock';
import ToastStack from '@/components/ToastStack';
import PageTransition from '@/components/cinematic/PageTransition';

export const metadata: Metadata = {
  metadataBase: new URL('https://vmission.org.in'),
  title: 'Vedanta Mission — Traditional Advaita Vedanta | Indore Ashram',
  description:
    'Vedanta Mission & Vedanta Ashram, Indore — A modern Gurukula in Central India dedicated to the traditional study of the Upanishads, Bhagavad Gita, and Advaita Vedanta.',
  keywords: [
    'Vedanta Mission',
    'Vedanta Ashram Indore',
    'Swami Atmananda Saraswati',
    'Advaita Vedanta',
    'Bhagavad Gita course',
    'Upanishad classes',
    'Tattva Bodha',
    'Gangeshwar Mahadev Temple',
    'Vedanta Sandesh',
  ],
  authors: [{ name: 'Vedanta Mission, Indore' }],
  creator: 'Vedanta Parmarthic Sewa Trust',
  openGraph: {
    title: 'Vedanta Mission — Traditional Advaita Vedanta | Indore Ashram',
    description:
      'Spreading Love & Light by revealing the basic oneness of all. Explore courses, audio discourses, publications, and visit Vedanta Ashram.',
    url: 'https://vmission.org.in',
    siteName: 'Vedanta Mission',
    images: [
      {
        url: '/brand/vedanta-mission/SOCIAL/og-logo-primary.png',
        width: 1200,
        height: 630,
        alt: 'Vedanta Mission',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/brand/vedanta-mission/FAVICON/favicon.svg?v=2026', type: 'image/svg+xml' },
      { url: '/favicon.svg?v=2026', type: 'image/svg+xml' },
      { url: '/brand/vedanta-mission/FAVICON/favicon-32.png?v=2026', sizes: '32x32', type: 'image/png' },
      { url: '/brand/vedanta-mission/FAVICON/favicon-16.png?v=2026', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.ico?v=2026', sizes: 'any' },
    ],
    shortcut: '/brand/vedanta-mission/FAVICON/favicon.svg?v=2026',
    apple: [
      { url: '/brand/vedanta-mission/APP-ICONS/apple-touch-icon.png?v=2026', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Noto+Serif+Devanagari:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/svg+xml" href="/brand/vedanta-mission/FAVICON/favicon.svg?v=2026" />
        <link rel="shortcut icon" href="/brand/vedanta-mission/FAVICON/favicon.svg?v=2026" />
        <link rel="icon" type="image/png" sizes="32x32" href="/brand/vedanta-mission/FAVICON/favicon-32.png?v=2026" />
        <link rel="icon" type="image/png" sizes="16x16" href="/brand/vedanta-mission/FAVICON/favicon-16.png?v=2026" />
        <link rel="apple-touch-icon" sizes="180x180" href="/brand/vedanta-mission/APP-ICONS/apple-touch-icon.png?v=2026" />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var s=window.location.search||'';var p=window.location.pathname||'';var seen=sessionStorage.getItem('vm-entry-scene-seen')==='true';var force=s.indexOf('intro=1')!==-1;var bypass=s.indexOf('intro=0')!==-1;if((p!=='/'&&p!=='')||bypass||(seen&&!force)){document.documentElement.classList.add('vm-entry-seen');}}catch(e){}`,
          }}
        />
      </head>
      <body>
        <ToastProvider>
          <DataProvider>
            <AudioPlayerProvider>
              <Navbar />
              <PageTransition>
                <main id="main-content">{children}</main>
              </PageTransition>
              <Footer />
              <AudioPlayerDock />
              <ToastStack />
            </AudioPlayerProvider>
          </DataProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
