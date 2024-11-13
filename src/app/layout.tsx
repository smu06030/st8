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
import Footer from '@/components/layout/Footer';

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
        <Nav />
        <Footer />
      </body>
    </html>
  );
}
