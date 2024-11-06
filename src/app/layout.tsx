import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import RQProviders from '@/providers/RQRovider';
import KakaoMapLoader from '@/components/stampMap/KakaoMapLoader';
import Nav from '@/components/common/nav/Nav';
import Header from '@/components/layout/Header';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
});

export const metadata: Metadata = {
  title: '모아 메인 페이지',
  description: '모아 메인 페이지 입니다.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-backgroundGradient bg-no-repeat font-regular ${geistSans.variable} ${geistMono.variable} body-padding antialiased`}
      >
        <Header />
        <KakaoMapLoader />
        <RQProviders>
          {children}
          <div id="overlays"></div> {/* 모달창 */}
        </RQProviders>
        <Nav />
      </body>
    </html>
  );
}
