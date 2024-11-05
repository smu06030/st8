import React, { ReactPortal } from 'react';

interface AliasCheckModalPropsType {
  Modal: ({ children }: { children: React.ReactNode }) => ReactPortal | null;
}

const AliasCheckModal = ({ Modal }: AliasCheckModalPropsType) => {
  return (
    <Modal>
      <div
        onClick={(e) => e.stopPropagation()} //이벤트전파방지
        className=""
      >
        AliasCheckModalModal
      </div>
    </Modal>
  );
};

export default AliasCheckModal;
