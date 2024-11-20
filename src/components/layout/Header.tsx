import { useRouter } from 'next/navigation';
import { useHistory } from '@/providers/HistoryProvider';
import { PAGE_NAMES } from '@/constants/pageName';
import { usePathname } from 'next/navigation';

import Icon from '@/components/common/Icons/Icon';
import Link from 'next/link';
import MoaLogo from '@/components/common/Icons/MoaLogo';
import useHeaderActive from '@/hooks/layout/useHeaderActive';
import ClientHeaderMenu from '@/components/layout/ClientHeaderMenu';

const Header = () => {
  const { pageTitle } = useHeaderActive();
  const pathname = usePathname();
  const { history } = useHistory();
  const router = useRouter();

  const goBack = () => {
    if (history.length > 1) {
      const previousPage = history[history.length - 2]; // 바로 직전 페이지
      router.push(previousPage);
    } else {
      router.back();
    }
  };

  //헤더 안나오는 페이지(모바일)
  const hiddenHeaderPaths = ['/'];
  const shouldHideMobileHeader = hiddenHeaderPaths.includes(pathname);

  //디테일 부분도 헤더 볼드처리
  const getLinkStyle = (path: string) => {
    const isActive = path === '/' ? pathname === '/' : pathname.startsWith(path);

    return isActive ? 'text-gray-900 font-semiBold' : 'hover:font-regular';
  };
  if (!pageTitle) return null;

  return (
    <>
      {/* 모바일 */}
      {!shouldHideMobileHeader && (
        <header className="fixed top-0 z-[1000] block h-[56px] w-full bg-white shadow-headerShadow lg:hidden">
          <div className="flex items-center justify-between p-[12px]">
            <button onClick={goBack} className="text-gray-900">
              <Icon name="BackIcon" />
            </button>
            <h1 className="text-center font-semiBold text-[18px] text-gray-900">{pageTitle}</h1>
            <span className="w-6" />
          </div>
        </header>
      )}

      {/* PC */}
      <header className="fixed top-0 z-[100] hidden h-[56px] w-full bg-white shadow-headerShadow lg:block">
        <div className="mx-12 mt-2 flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-[12px]">
              <Link href="/home">
                <MoaLogo />
              </Link>
            </div>
          </div>

          <nav className="flex flex-1 justify-center space-x-8 text-sm font-normal text-gray-700">
            <Link
              href={PAGE_NAMES.LANDING.link}
              className={`${getLinkStyle('/')} rounded-md px-4 py-2 transition duration-300 hover:bg-gray-200`}
            >
              서비스 소개
            </Link>

            <Link
              href={PAGE_NAMES.MAP.link}
              className={`${getLinkStyle('/stamp-map')} rounded-md px-4 py-2 transition duration-300 hover:bg-gray-200`}
            >
              지도
            </Link>
            <Link
              href={PAGE_NAMES.TOURISM.link}
              className={`${getLinkStyle('/tourism')} rounded-md px-4 py-2 transition duration-300 hover:bg-gray-200`}
            >
              추천여행지
            </Link>
            <Link
              href={PAGE_NAMES.ALBUM.link}
              className={`${getLinkStyle('/photo-album')} rounded-md px-4 py-2 transition duration-300 hover:bg-gray-200`}
            >
              앨범
            </Link>
            <Link
              href={PAGE_NAMES.STAMP.link}
              className={`${getLinkStyle('/stamp-all')} rounded-md px-4 py-2 transition duration-300 hover:bg-gray-200`}
            >
              스탬프
            </Link>
          </nav>

          <ClientHeaderMenu />
        </div>
      </header>
    </>
  );
};

export default Header;
