'use client';

import { useState } from 'react';
import { PAGE_NAMES } from '@/constants/pageName';
import { usePathname } from 'next/navigation';

import Nav from '@/components/layout/Nav';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import localFont from 'next/font/local';
import RQProviders from '@/providers/RQRovider';
import KakaoMapLoader from '@/components/stampMap/KakaoMapLoader';

import './globals.css';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);
  const pathname = usePathname();

  // mo 랜딩페이지에서 네비 히든
  const hideNavPaths = [PAGE_NAMES.LANDING.link, PAGE_NAMES.MAP.link];
  // pc 맵페이지에서 푸터 히든
  const hideFooterPaths = [PAGE_NAMES.MAP.link];

  return (
    <html lang="ko">
      <body
        className={`bg-no-repeat font-regular lg:bg-[#F5F5F7] mo-only:bg-backgroundGradient ${geistSans.variable} ${geistMono.variable} ${!showSplash ? 'body-padding' : ''} antialiased`}
      >
        <Header />
        <KakaoMapLoader />
        <RQProviders>
          {children}
          <div id="overlays"></div> {/* 모달창 */}
        </RQProviders>
        {!hideNavPaths.includes(pathname) && <Nav />}
        {!hideFooterPaths.includes(pathname) && <Footer />}
      </body>
    </html>
  );
}
