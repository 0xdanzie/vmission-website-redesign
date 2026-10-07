import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Seva & Sacred Offerings | Support Vedanta Mission, Indore',
  description:
    'Participate in sustaining Vedanta Ashram and the traditional teaching of Advaita Vedanta. Bank account details (NEFT/RTGS), UPI IDs, 80-G tax exemption guidelines, and overseas offering instructions.',
  keywords: [
    'Vedanta Mission donation',
    'Vedanta Parmarthik Sewa Trust',
    'Vedanta Ashram Seva',
    '80-G tax exemption ashram donation',
    'NEFT HDFC Vedanta Parmarthik Sewa Trust',
    'UPI vmission hdfcbank',
    'Annadanam Bhiksha seva Indore',
  ],
  openGraph: {
    title: 'Seva & Sacred Offerings | Support Vedanta Mission, Indore',
    description:
      'Participate in sustaining Vedanta Ashram and the traditional teaching of Advaita Vedanta. Bank account details (NEFT/RTGS), UPI IDs, 80-G tax exemption guidelines, and overseas offering instructions.',
    url: 'https://vmission.org.in/donate/',
    siteName: 'Vedanta Mission',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://vmission.org.in/donate/',
  },
};

export default function DonateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
