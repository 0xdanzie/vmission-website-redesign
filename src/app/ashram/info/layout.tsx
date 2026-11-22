import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Introduction to Vedanta Ashram | Indore',
  description: 'Discover the history, spiritual lineage, and mission of Vedanta Ashram, Indore founded by Swami Atmananda Saraswati.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
