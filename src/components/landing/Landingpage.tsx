'use client';

import { useRouter } from 'next/navigation';
import Button from '../common/Buttons/Button';

const LandingPage = () => {
  const router = useRouter();

  const goToLogin = () => {
    router.push('/login');
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center space-y-4 p-10">
        <Button text="여행 떠나기" variant={'blue'} onClick={goToLogin} />
      </div>
    </div>
  );
};

export default LandingPage;
