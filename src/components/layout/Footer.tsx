import React from 'react';
import Image from 'next/image';

const Footer = () => {
  const person = [
    { name: '송혜인', job: 'Front-end Developer', img: '/images/logo.png' },
    { name: '임보라', job: 'Front-end Developer', img: '/images/logo.png' },
    { name: '유인철', job: 'Front-end Developer', img: '/images/logo.png' },
    { name: '박규리', job: 'Front-end Developer', img: '/images/logo.png' },
    { name: '김재범', job: 'Product Designer', img: '/images/logo.png' }
  ];
  const footerText = ['이용약관', '개인정보처리방침', 'Notion', 'Github', '내일배움캠프'];

  return (
    <div className="w-full bg-[#fff] py-[58px]">
      <div className="mx-auto w-full max-w-[1080px]">
        <h2 className="text-semiBold mb-[18px] text-[24px] text-gray-500">모아를 만든 사람들</h2>
        <div className="flex flex-col items-end gap-[124px]">
          <ul className="grid grid-cols-5 gap-[12px]">
            {person.map((info) => (
              <li key={info.name} className="isInfo relative cursor-pointer overflow-hidden rounded-[24px] bg-[#eee]">
                <Image src={info.img} alt={info.name} width={300} height={300} />
                <div className="absolute bottom-0 left-0 hidden h-[40%] w-full flex-col gap-[4px] bg-[#1D1D1D] p-[10px] px-[18px] py-[24px] text-[#fff] opacity-[.8]">
                  <p className="text-[14px]">{info.name}</p>
                  <p>{info.job}</p>
                </div>
              </li>
            ))}
          </ul>
          <ul className="flex">
            {footerText.map((footer) => (
              <li key={footer} className="px-[16px] py-[12px]">
                {footer}
              </li>
            ))}
          </ul>
        </div>
        <footer className="border border-b-[#D9D9D9]">
          <div></div>
          {/* <Image src="/images/logo.png" alt="logo" width={300} height={300} /> */}
          <div></div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
