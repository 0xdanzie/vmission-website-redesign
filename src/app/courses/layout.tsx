import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Courses & Study Programs | Vedanta Mission',
  description:
    'Structured online and residential Vedanta courses, including Tattva Bodha, Gita correspondence programs, and traditional scriptural inquiry.',
};

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
