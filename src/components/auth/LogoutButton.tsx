'use client';

import { logout } from '@/utils/supabase/auth';
import { useRouter } from 'next/navigation';

import Button from '@/components/common/Buttons/Button';
import useModal from '@/hooks/modal/useModal';

const LogoutButton = () => {
  const router = useRouter();
  const { openModal, Modal, closeModal } = useModal();

  const handleLogout = async () => {
    try {
      await logout();
      closeModal();
      window.location.href = '/login';
    } catch (error) {}
  };

  const openLogoutModal = () => {
    openModal();
  };

  return (
    <>
      <button onClick={openLogoutModal} className="mt-[34px] text-sm text-gray-500">
        로그아웃
      </button>
      <Modal>
        <div className="fixed inset-0 mx-[25px] flex items-center justify-center">
          <div className="w-full max-w-[327px] rounded-3xl bg-white p-[32px]">
            <p className="text-xl font-semibold leading-relaxed">정말 로그아웃 하시겠습니까?</p>
            <div className="mt-[18px] flex w-full">
              <Button text="로그아웃 하기" variant="blue" onClick={handleLogout} />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LogoutButton;
