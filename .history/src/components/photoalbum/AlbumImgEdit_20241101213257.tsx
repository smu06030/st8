import React from 'react';

const AlbumImgEdit = ({ deleteId, onHandleDelete }) => {
  return (
    <div className="fixed bottom-0 flex w-full items-center justify-between px-[24px] py-[28px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.10)]">
      <span className="text-[#D22730]">{deleteId.length > 0 ? `${deleteId.length}` : 0}개</span>
      <button className="text-[##1D1D1D]" onClick={onHandleDelete}>
        선택 항목 삭제
      </button>
    </div>
  );
};

export default AlbumImgEdit;
