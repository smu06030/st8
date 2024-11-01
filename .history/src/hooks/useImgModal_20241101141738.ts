import { useState } from 'react';

const useImgModal = () => {
    const [imgModal, setImgModal] = useState(false);
    const [selectedImgUrl, setSelectedImgUrl] = useState('');

    const onClickImgModal = (url: string) => {
        setSelectedImgUrl(url);
        setImgModal(true);
      };
  return {
   selectedImgUrl,
    imgModal,
    onClickImgModal,
    setImgModal,
  }
}

export default useImgModal;