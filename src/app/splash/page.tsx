import Image from 'next/image';
import React from 'react';

const page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary-500">
      <Image src="/images/logo.png" alt="Logo" width="128" height="128" className="object-contain" />
    </div>
  );
};

export default page;
