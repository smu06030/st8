import { useRef, useState } from 'react';

const useAlbumDelete = () => {
  const [edit, setEdit] = useState(false);
  const [deleteId, setDeleteId] = useState<number[]>([]);

  //체크이벤트로 아이디값 배열로 담기
  const handleCheckboxChange = (id: number) => {
    setDeleteId((prev) => {
      if (prev.includes(id)) {
        //선택한아이디들에 아이디가 포함되어있으면
        return prev.filter((item) => item !== id); //아이디중복제거
      } else {
        return [...prev, id];
      }
    });
  };

  return {
    edit,
    setEdit,
    deleteId,
    setDeleteId,
    handleCheckboxChange
  };
};

export default useAlbumDelete;
