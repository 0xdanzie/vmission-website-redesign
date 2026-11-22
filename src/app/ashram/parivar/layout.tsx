import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ashram Parivar | Vedanta Ashram, Indore',
  description: 'Join the global fellowship of Vedanta Ashram Parivar supporting the dissemination of Advaita Vedanta.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
