import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ashram Activities | Vedanta Ashram, Indore',
  description: 'Daily spiritual schedule, scriptural classes, and festival celebrations at Vedanta Ashram, Indore.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
