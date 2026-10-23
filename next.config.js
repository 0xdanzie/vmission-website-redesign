/** @type {import('next').NextConfig} */
const rawBasePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').trim();
// The website is hosted at the root of a domain on Vercel.
// Never set a subpath basePath on Vercel or when rawBasePath is root '/' or empty.
const isVercel = process.env.VERCEL === '1';
const normalizedBasePath =
  !isVercel && rawBasePath && rawBasePath !== '/'
    ? rawBasePath.replace(/\/+$/, '')
    : undefined;

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: normalizedBasePath,
};

module.exports = nextConfig;
