import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const techTeam = [
    { name: '유인철', job: 'Frontend Developer', img: '/images/footer/team01.png' },
    { name: '임보라', job: 'Frontend Developer', img: '/images/footer/team02.png' },
    { name: '박규리', job: 'Frontend Developer', img: '/images/footer/team03.png' },
    { name: '송혜인', job: 'Frontend Developer', img: '/images/footer/team04.png' },
    { name: '김재범', job: 'Product Designer', img: '/images/footer/team05.png' }
  ];
  const footerText = [
    { title: '이용약관', link: 'https://forest-act-835.notion.site/1422d534ecca800b93d1dafa00037e7f?pvs=4' },
    { title: '개인정보처리방침', link: 'https://forest-act-835.notion.site/1422d534ecca804e8750e2658afb0bd5?pvs=4' },
    { title: 'Notion', link: 'https://www.notion.so/teamsparta/8-bf17275ec94f4ac988eb0362363e3df6' },
    { title: 'Github', link: 'https://github.com/smu06030/st8' },
    { title: '내일배움캠프', link: 'https://nbcamp.spartacodingclub.kr/frontend' }
  ];

  return (
    <div className="hidden w-full bg-[#fff] py-[58px] lg:block">
      <div className="pc-inner-width">
        <h2 className="mb-[18px] font-semiBold text-[24px] text-gray-500">모아를 만든 사람들</h2>
        <div className="flex flex-col items-end gap-[124px]">
          <ul className="grid grid-cols-5 gap-[12px]">
            {techTeam.map((info) => (
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
              <li key={footer.title} className="px-[16px] py-[12px] text-gray-500">
                <Link href={footer.link} legacyBehavior>
                  <a target="_blank" rel="noopener noreferrer">
                    {footer.title}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <footer className="flex justify-between border-t border-[#D9D9D9] pt-[40px]">
          <div className="ml-[8px] flex flex-col gap-[18px]">
            <h2 className="font-semiBold text-[24px] text-gray-500">내 손안에 여행기 모아</h2>
            <div>
              <p className="text-[14px] text-gray-500">
                내 손안에 여행기 모아(8조) 내일배움캠프 react 6기 8조
                <br />
                참여 부트캠프 nbcamp_react_6th
                <br />
                ⓒCopyright 2024 - Project MOA
              </p>
            </div>
          </div>
          <div className="mr-[36px]">
            <Image src="/images/logo_dark.png" alt="logo" width={100} height={100} />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
