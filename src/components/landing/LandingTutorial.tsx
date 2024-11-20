import React, { useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';

const LandingTutorial = () => {
  const [position, setPosition] = useState(0);

  const handleClick = () => {
    setPosition(position + 1); // 다음 페이지로 이동
  };

  return (
    <div className="tutorial-container animate-tutoriaslide z-1 top-0 h-full w-full bg-backgroundGradient">
      <div className="w-full px-[24px] pt-[10%]">
        <h2 className="tutorialTitle">
          모아가 알려주는
          <br />
          스탬프 생활
        </h2>
      </div>
      <div className="h-full w-full">
        <ul
          className="slides"
          style={{ transform: `translateX(-${(position * 100) / 5}%)`, transition: 'transform 0.5s' }}
        >
          <li className="slide flex w-[100%] flex-col">
            <div className="px-[24px]">
              <Image src={`/images/landing/mo-landing-01.png`} alt={'step1'} width={500} height={500} loading="eager" />
            </div>
            <button className="button" onClick={handleClick}>
              다음으로
            </button>
          </li>
          <li className="slide flex w-[100%] flex-col">
            <div className="px-[24px]">
              <Image src={`/images/landing/mo-landing-02.png`} alt={'step2'} width={500} height={500} loading="eager" />
            </div>
            <button className="button" onClick={handleClick}>
              다음으로
            </button>
          </li>
          <li className="slide flex w-[100%] flex-col">
            <div className="px-[24px]">
              <Image src={`/images/landing/mo-landing-03.png`} alt={'step3'} width={500} height={500} loading="eager" />
            </div>
            <button className="button" onClick={handleClick}>
              다음으로
            </button>
          </li>
          <li className="slide flex w-[100%] flex-col">
            <div className="px-[24px]">
              <Image src={`/images/landing/mo-landing-04.png`} alt={'step4'} width={500} height={500} loading="eager" />
            </div>
            <button className="button" onClick={handleClick}>
              다음으로
            </button>
          </li>
          <li className="slide flex w-[100%] flex-col">
            <div className="px-[24px]">
              <Image src={`/images/landing/mo-landing-05.png`} alt={'step5'} width={500} height={500} loading="eager" />
            </div>
            <Link href="/signup" className="button">
              <button>여행떠나기</button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LandingTutorial;
