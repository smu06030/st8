import { useState } from 'react';

export const useImgModal = () => {
  const [imgModal, setImgModal] = useState(false);
  const [selectedImgUrl, setSelectedImgUrl] = useState('');
  const [activeImgId, setActiveImgId] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const onClickImgModal = (url: string, id: string, index: number) => {
    setCurrentIndex(index);
  };

  return {
    selectedImgUrl,
    imgModal,
    onClickImgModal,
    setImgModal,
    activeImgId,
    setActiveImgId,
    currentIndex,
    setCurrentIndex
  };
};

export default useImgModal;
