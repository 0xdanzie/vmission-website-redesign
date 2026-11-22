import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bhagwad Gita Study Course | Vedanta Ashram, Indore',
  description: 'Comprehensive one-year residential study course of all 18 chapters of the Bhagavad Gita at Vedanta Ashram, Indore.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
