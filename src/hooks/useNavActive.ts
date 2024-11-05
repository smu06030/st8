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