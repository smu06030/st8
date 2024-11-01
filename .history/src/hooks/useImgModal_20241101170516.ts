import { useState } from 'react';

export const useImgModal = () => {
  const [imgModal, setImgModal] = useState(false);
  const [selectedImgUrl, setSelectedImgUrl] = useState('');
  const [activeImgId, setActiveImgId] = useState(null);

  const onClickImgModal = (url: string, id: string) => {
    setSelectedImgUrl(url);
    setImgModal(true);
    setActiveImgId(id);
  };
  return {
    //밖에서
    selectedImgUrl,
    imgModal,
    onClickImgModal,
    setImgModal,
    activeImgId,
    setActiveImgId
  };
};

export default useImgModal;
