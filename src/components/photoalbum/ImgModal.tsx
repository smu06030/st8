import React from 'react';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

interface ImageModalType {
  selectedImgUrl: string;
  setImgModal: Dispatch<SetStateAction<boolean>>;
}
const ImgModal = ({ setImgModal, selectedImgUrl }: ImageModalType) => {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-[#363636] bg-opacity-50">
      <div className="relative h-[75vh] w-full bg-[#D9D9D9]">
        <Image src={selectedImgUrl} alt="" layout="fill" objectFit="cover" />
        <button className="absolute right-[10px] top-[-30px] text-white" onClick={() => setImgModal(false)}>
          X
        </button>
      </div>
    </div>
  );
};

export default ImgModal;
