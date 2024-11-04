'use client';

import useModal from '@/hooks/useModal';
import { logout } from '@/utils/supabase/auth';
import { useRouter } from 'next/navigation';
import Button from '../common/Buttons/Button';

const LogoutButton = () => {
  const router = useRouter();
  const { openModal, Modal, closeModal } = useModal();

  const handleLogout = async () => {
    try {
      await logout();
      closeModal(); // 로그아웃 후 모달 닫기
      router.push('/landing'); // 로그아웃 후 landing 페이지로 이동
    } catch (error) {
      alert('로그아웃 중 오류가 발생했습니다: ');
    }
  };

  const openLogoutModal = () => {
    openModal();
  };

  return (
    <>
      <button onClick={openLogoutModal} className="text-[14px] text-gray-500">
        로그아웃
      </button>
      <Modal>
        <div className="fixed inset-0 m-[18px] flex items-center justify-center">
          <div className="w-full rounded-[12px] bg-white p-[32px]">
            <p className="text-[14px] font-semibold">정말 로그아웃 하시겠습니까?</p>
            <div className="mt-4 flex">
              <Button label="로그아웃 하기" variant="yellow" onClick={handleLogout} />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LogoutButton;
