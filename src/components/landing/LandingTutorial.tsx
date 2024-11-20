import React, { useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';

const LandingTutorial = () => {
  const [position, setPosition] = useState(0);

  const handleClick = () => {
    setPosition(position + 1); // 다음 페이지로 이동
  };
  console.log('position', position);
  return (
    <div className="tutorial-container z-1 top-0 hidden h-full w-full animate-tutoriaslide bg-backgroundGradient mo-only:flex">
      <div className="w-full px-[24px] pt-[10%]">
        <h2 className="tutorialTitle">
          모아가 알려주는
          <br />
          스탬프 생활
        </h2>
      </div>
      <div className="flex w-full flex-col gap-[20px]">
        <ul
          className="slides"
          style={{ transform: `translateX(-${(position * 100) / 5}%)`, transition: 'transform 0.5s' }}
        >
          <li className="slide flex w-[100%]">
            <div className="px-[24px]">
              <Image src={`/images/landing/mo-landing-01.png`} alt={'step1'} width={500} height={500} loading="eager" />
            </div>
          </li>
          <li className="slide flex w-[100%]">
            <div className="px-[24px]">
              <Image src={`/images/landing/mo-landing-02.png`} alt={'step2'} width={500} height={500} loading="eager" />
            </div>
          </li>
          <li className="slide flex w-[100%]">
            <div className="px-[24px]">
              <Image src={`/images/landing/mo-landing-03.png`} alt={'step3'} width={500} height={500} loading="eager" />
            </div>
          </li>
          <li className="slide flex w-[100%]">
            <div className="px-[24px]">
              <Image src={`/images/landing/mo-landing-04.png`} alt={'step4'} width={500} height={500} loading="eager" />
            </div>
          </li>
          <li className="slide flex w-[100%]">
            <div className="px-[24px]">
              <Image src={`/images/landing/mo-landing-05.png`} alt={'step5'} width={500} height={500} loading="eager" />
            </div>
          </li>
        </ul>
        {position === 4 ? (
          <Link href="/signup" className="button">
            여행떠나기
          </Link>
        ) : (
          <button className="button" onClick={handleClick}>
            다음으로
          </button>
        )}
      </div>
    </div>
  );
};

export default LandingTutorial;
