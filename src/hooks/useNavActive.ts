import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export const useNavActive = () => {
  const params = useParams();

  const [activePage, setActivePage] = useState('/');

  useEffect(() => {
    const currentPath = window.location.pathname;
    setActivePage(currentPath);
  }, [params]);

  const handleClick = (link: string) => {
    setActivePage(link);
  };

  return {
    activePage,
    setActivePage,
    handleClick
  };
};

export default useNavActive;

// if (currentPath.startsWith('/stamp-all')) {
//   setActivePage('/stamp-all');
// } else if (currentPath.startsWith('/photo-album')) {
//   setActivePage('/photo-album');
// } else if (currentPath.startsWith('/tourism')) {
//   setActivePage('/tourism');
// } else if (currentPath.startsWith('/mypage')) {
//   setActivePage('/tourism');
// } else if (currentPath === '/') {
//   setActivePage('/');
// } else if (currentPath.startsWith('/stamp-tracking')) {
//   setActivePage('/stamp-all');
// } else {
//   setActivePage(''); // 정의되지 않은 페이지는 빈 제목
// }
