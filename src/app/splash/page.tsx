import Image from 'next/image';
import React from 'react';

const SplashPage = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-secondary-500">
      <Image src="/images/logo.png" alt={'Logo'} width={128} height={128} priority className="object-contain" />
    </div>
  );
};

export default SplashPage;
