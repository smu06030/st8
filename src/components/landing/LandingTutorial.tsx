import { useRouter } from 'next/navigation';
import { PAGE_NAMES } from '@/constants/pageName';
import React, { useState } from 'react';

import Button from '@/components/common/Buttons/Button';
import Link from 'next/link';

const LandingTutorial = () => {
  const router = useRouter();
  const [position, setPosition] = useState(0);

  const handleClick = () => {
    setPosition(position + 1); // 다음 페이지로 이동
  };

  return (
    <div className="tutorial-container animate-tutoriaslide z-1 top-0 h-full w-full">
      <ul
        className="slides"
        style={{ transform: `translateX(-${(position * 100) / 3}%)`, transition: 'transform 0.5s' }}
      >
        <li className="slide flex h-[100vh] w-[100%] flex-col bg-white">
          <h2 className="tutorialTitle">여행, 그리고 기록</h2>
          <span>여행기록부터 스탬프 수집까지 모아랑 함께.</span>
          <div></div>
          <button
            onClick={handleClick}
            className="relative h-[10%] w-[90vw] min-w-[300px] rounded-[36px] bg-black text-white"
          >
            다음
          </button>
        </li>
        <li className="slide flex h-[100vh] w-[100%] flex-col bg-white">
          <h2 className="tutorialTitle">스탬프</h2>
          <span>수집하고픈 아기자기한 스탬프들</span>
          <div></div>
          <button
            onClick={handleClick}
            className="relative h-[10%] w-[90vw] min-w-[300px] rounded-[36px] bg-black text-white"
          >
            다음
          </button>
        </li>
        <li className="slide flex h-[100vh] w-[100%] flex-col bg-white">
          <h2 className="tutorialTitle">추천 여행지</h2>
          <span>모아가 엄선한 국내 추천 여행지</span>
          <div></div>
          <button className="relative h-[10%] w-[90vw] min-w-[300px] rounded-[36px] bg-black text-white">
            <Link href={PAGE_NAMES.SIGNUP.link}>여행떠나기</Link>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default LandingTutorial;
