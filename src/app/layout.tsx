'use client';

import { useEffect, useState } from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import RQProviders from '@/providers/RQRovider';
import KakaoMapLoader from '@/components/stampMap/KakaoMapLoader';
import Nav from '@/components/layout/Nav';
import Header from '@/components/layout/Header';
import SplashPage from './splash/page';

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

// export const metadata: Metadata = {
//   title: '모아 메인 페이지',
//   description: '모아 메인 페이지 입니다.'
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="ko">
      <body
        className={`bg-no-repeat font-regular lg:bg-[#F5F5F7] mo-only:bg-backgroundGradient ${geistSans.variable} ${geistMono.variable} ${!showSplash ? 'body-padding' : ''} antialiased`}
      >
        {showSplash ? (
          <SplashPage />
        ) : (
          <>
            <Header />
            <KakaoMapLoader />
            <RQProviders>
              {children}
              <div id="overlays"></div> {/* 모달창 */}
            </RQProviders>
            <Nav />
          </>
        )}
      </body>
    </html>
  );
}
