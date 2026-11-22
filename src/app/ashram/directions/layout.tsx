import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Directions & Location | Vedanta Ashram, Indore',
  description: 'How to reach Vedanta Ashram in Sudama Nagar, Indore by Air, Rail, and Road with maps and local transit details.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
