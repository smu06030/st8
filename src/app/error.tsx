'use client';

import { useEffect } from 'react';

import Button from '@/components/common/Buttons/Button';
import CameraIcon from '@/components/common/Icons/Loading/CameraIcon';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error, error.message);
  }, [error]);

  return (
    <div className="flex h-[100vh] w-full flex-col items-center justify-center font-regular">
      <CameraIcon />
      <h2 className="mb-[14px] mt-9 text-base text-alert">{error.message}</h2>
      <Button text="다시 시도하기" variant="blue" onClick={() => reset()} />
    </div>
  );
}
