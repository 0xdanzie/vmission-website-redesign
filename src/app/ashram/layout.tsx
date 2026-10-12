import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vedanta Ashram & Sri Gangeshwar Mahadev Mandir | Indore',
  description:
    'Step inside Vedanta Ashram in Sudama Nagar, Indore: consecrated Gangeshwar Mahadev Mandir, daily contemplative rhythm, Gurukula study spaces, residential community, and travel directions.',
};

export default function AshramLayout({ children }: { children: React.ReactNode }) {
  return children;
}
