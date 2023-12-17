const withMDX = require('@next/mdx')()
 
const ContentSecurityPolicy = `
    default-src 'self' vercel.live;
    script-src 'self' 'unsafe-eval' 'unsafe-inline' vercel.live vitals.vercel-insights.com;
    style-src 'self' 'unsafe-inline';
    img-src * blob: data:;
    media-src 'none';
    frame-src giscus.app;
    connect-src *;
    font-src 'self';
`;
 
const securityHeaders = [
	{
		key: 'Content-Security-Policy',
		value: ContentSecurityPolicy.replace(/\n/g, ''),
	},
	// Other security headers
	// ...
];
/** @type {import('next').NextConfig} */
const nextConfig = {
  headers() {
		return [
			{
				source: '/(.*)',
				headers: securityHeaders,
			},
		];
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