import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import Head from 'next/head';

export const metadata: Metadata = {
  title: {
    template: '%s | 田原・清研 飲み物投票',
    default: '田原・清研 飲み物投票',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
