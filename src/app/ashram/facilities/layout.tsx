import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ashram Facilities | Vedanta Ashram, Indore',
  description: 'Facilities at Vedanta Ashram, Indore: Satsang hall, scriptural library, accommodation, and quiet gardens for meditation.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
