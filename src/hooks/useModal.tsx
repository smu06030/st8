import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPortalElement(document.getElementById('overlays'));
    }
  }, [isOpen]);

  // 페이지 경로 변경 시 모달 닫기 및 스크롤 복구

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const Modal = useCallback(
    ({ children }: { children: React.ReactNode }) => {
      if (!isOpen || !portalElement) return null;
      return createPortal(
        <div
          onClick={closeModal}
          style={{ zIndex: 999, backgroundColor: 'rgba(53, 53, 53, 0.6)' }}
          className="fixed inset-0"
        >
          {children}
        </div>,
        portalElement
      );
    },
    [isOpen, portalElement, closeModal]
  );

  return {
    isOpen,
    openModal,
    closeModal,
    Modal
  };
};

export default useModal;
