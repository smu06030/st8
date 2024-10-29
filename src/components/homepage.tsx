'use client';

import { useRouter } from 'next/navigation';

const Homepage = () => {
  const router = useRouter();

  const goToLogin = () => {
    router.push('/login');
  };

  const goToSignup = () => {
    router.push('/signup');
  };

  return (
    <div>
      <p className="p-10 font-bold text-3xl">
        나만의 똑똑한 <br />
        여행 다이어리 전국 8도
      </p>
      <div className="flex flex-col space-y-4 p-10">
        <button
          type="button"
          onClick={goToLogin}
          className="h-auto w-[326px] bg-defaultcolor p-3 font-bold text-gray-500"
        >
          여행 떠나기
        </button>
        <button
          type="button"
          onClick={goToSignup}
          className="h-auto w-[326px] bg-defaultcolor p-3 font-bold text-gray-500"
        >
          회원가입하기
        </button>
      </div>
    </div>
  );
};

export default Homepage;
