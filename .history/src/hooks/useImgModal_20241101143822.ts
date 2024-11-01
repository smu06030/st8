import { useState } from 'react';

export const useImgModal = () => {
  const [imgModal, setImgModal] = useState(false);
  const [selectedImgUrl, setSelectedImgUrl] = useState('');

  const onClickImgModal = (url: string) => {
    setSelectedImgUrl(url);
    setImgModal(true);
  };
  return {
    //밖에서
    selectedImgUrl,
    imgModal,
    onClickImgModal,
    setImgModal
  };
};
