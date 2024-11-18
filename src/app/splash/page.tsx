'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Image from 'next/image';

const SplashPage = () => {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false); // 1초 후에 스플래시 화면을 숨김
      router.push('/');
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  if (!isVisible) return null;

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-secondary-500">
      <Image src="/images/logo.png" alt="Logo" width={128} height={128} priority className="object-contain" />
    </div>
  );
};

export default SplashPage;
