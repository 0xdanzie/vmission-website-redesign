/**
 * Helper to resolve asset URLs (images, audio, icons)
 * ensuring proper basePath prefixing when deployed under a repository subpath (e.g. GitHub Pages).
 */
export function getAssetPath(path?: string | null): string {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }
  const isVercel = process.env.VERCEL === '1';
  const rawBasePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').trim();
  const basePath = !isVercel && rawBasePath && rawBasePath !== '/'
    ? rawBasePath.replace(/\/+$/, '')
    : '';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}
