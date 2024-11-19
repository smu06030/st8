'use client';

import useModal from '@/hooks/modal/useModal';
import LogoutModal from '../common/Modal/LogoutModal';

const LogoutButton = () => {
  const { openModal, Modal, closeModal } = useModal();

  const handleOpenLogoutModal = () => {
    openModal();
  };

  return (
    <>
      <button onClick={handleOpenLogoutModal} className="mt-[34px] text-sm text-gray-500">
        로그아웃
      </button>

      <Modal>
        <LogoutModal closeModal={closeModal} />
      </Modal>
    </>
  );
};

export default LogoutButton;
