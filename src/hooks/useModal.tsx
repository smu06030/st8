import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
  console.log('>>>>>>>>>>>');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPortalElement(document.getElementById('overlays'));
    }
  }, [isOpen]);

  const openModal = useCallback(() => {
    setIsOpen(true);
    document.body.style.overflowY = 'hidden';
  }, []);
  const closeModal = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflowY = 'auto';
  }, []);

  const Modal = useCallback(({ children }: { children: React.ReactNode }) => {
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
  }, []);

  return {
    isOpen,
    openModal,
    closeModal,
    Modal
  };
};

export default useModal;
