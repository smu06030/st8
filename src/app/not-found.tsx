'use client';

import Button from '@/components/common/Buttons/Button';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  const onClickEvent = () => {
    router.push('/');
  };

  return (
    <div className="flex h-[100vh] w-full flex-col items-center justify-center font-regular text-gray-400">
      <h1 className="font-extraBold text-[150px]">404</h1>
      <p className="font-semiBold text-4xl leading-[46.80px]">Not found</p>
      <div className="mt-12">
        <Button text="홈으로 이동하기" variant="blue" onClick={onClickEvent} />
      </div>
    </div>
  );
}
