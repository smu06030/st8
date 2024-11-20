'use client';

import { logout } from '@/utils/supabase/auth';

<<<<<<< HEAD
import Button from '@/components/common/Buttons/Button';
=======
import Button from '../Buttons/Button';
>>>>>>> 547e7b1b61139bd03559ea57dc9ee083cb0aedd0

interface LogoutModalProps {
  closeModal: () => void;
}

const LogoutModal = ({ closeModal }: LogoutModalProps) => {
  const handleLogout = async () => {
    try {
      await logout();
      closeModal();
      window.location.href = '/login';
    } catch (error) {
      const errorMessage = '로그아웃 중 오류 발생';
      throw new Error(errorMessage);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={closeModal} // 배경 클릭 시 모달 닫기
    >
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-[327px] rounded-3xl bg-white p-[32px]">
        <p className="text-xl font-semibold leading-relaxed">정말 로그아웃 하시겠습니까?</p>
        <div className="mt-[18px] flex w-full">
          <Button text="로그아웃 하기" variant="blue" onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
