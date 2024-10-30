'use client';

import { logout } from '@/utils/supabase/auth';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      alert('로그아웃 중 오류가 발생했습니다: ');
    }
  };

  return (
    <button onClick={handleLogout} className="text-gray-500">
      로그아웃
    </button>
  );
};

export default LogoutButton;
