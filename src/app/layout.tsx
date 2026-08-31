import type { Metadata } from 'next';
import './globals.css';
import { AudioPlayerProvider } from '@/context/AudioPlayerContext';
import { ToastProvider } from '@/context/ToastContext';
import { DataProvider } from '@/context/DataContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AudioPlayerDock from '@/components/AudioPlayerDock';
import ToastStack from '@/components/ToastStack';

export const metadata: Metadata = {
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
    locale: 'en_IN',
    type: 'website',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body>
        <ToastProvider>
          <DataProvider>
            <AudioPlayerProvider>
              <Navbar />
              <main id="main-content">{children}</main>
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
