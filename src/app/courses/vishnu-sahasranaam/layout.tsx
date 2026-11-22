import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sri Vishnu Sahasranaam Course | Vedanta Mission',
  description: 'Systematic 10-part study series and commentary on Sri Vishnu Sahasranama with Shankaracharya Bhashya.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
