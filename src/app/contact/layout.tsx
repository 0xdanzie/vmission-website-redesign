import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connect with the Ashram | Contact Vedanta Mission, Indore',
  description:
    'Reach Vedanta Ashram in Indore. Physical address, visit guidelines, Sri Gangeshwar Mahadev Mandir darshan hours, office helplines, or submit an institutional inquiry.',
  keywords: [
    'Contact Vedanta Ashram',
    'Vedanta Mission Indore',
    'Vedanta Ashram directions',
    'Sri Gangeshwar Mahadev Mandir darshan hours',
    'Swami Atmananda Saraswati contact',
    'Sudama Nagar Indore ashram',
  ],
  openGraph: {
    title: 'Connect with the Ashram | Contact Vedanta Mission, Indore',
    description:
      'Reach Vedanta Ashram in Indore. Physical address, visit guidelines, Sri Gangeshwar Mahadev Mandir darshan hours, office helplines, or submit an institutional inquiry.',
    url: 'https://vmission.org.in/contact/',
    siteName: 'Vedanta Mission',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://vmission.org.in/contact/',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
