import { redirect } from 'next/navigation';

export default function AdminNewsPage() {
  // Publications and Monthly News Ezines are managed under /admin/publications
  redirect('/admin/publications');
}
