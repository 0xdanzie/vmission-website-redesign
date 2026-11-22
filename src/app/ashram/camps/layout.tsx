import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sadhna Camps | Vedanta Ashram, Indore',
  description: 'Residential scriptural camps, meditation retreats, and Gita Gyana Yagnas conducted by Vedanta Mission.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
