const withMDX = require('@next/mdx')()
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    COMMENTS_REPO: 'fireing123/cl-backend',
		COMMENTS_REPO_ID: 'R_kgDOKpz8cQ',
		COMMENTS_CATEGORY: 'General',
		COMMENT_CATEGORY_ID: 'DIC_kwDOKpz8cc4Cbzrt',
  },
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'bzblbjctcnn3zidp.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
}
 
module.exports = withMDX(nextConfig)