import { useState } from 'react';

export const useImgModal = () => {
  const [imgModal, setImgModal] = useState(false);
  const [selectedImgUrl, setSelectedImgUrl] = useState('');
  const [activeImgId, setActiveImgId] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const onClickImgModal = (url: string, id: string, index: number) => {
    setSelectedImgUrl(url);
    setImgModal(true);
    setActiveImgId(id);
    setCurrentIndex(index);
  };

  return {
    //밖에서
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
