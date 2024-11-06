import { useState } from 'react';

const useAlbumEdit = () => {
  const [edit, setEdit] = useState(false);

  const onClickOpenEdit = () => setEdit((prev) => !prev);

  return {
    edit,
    setEdit,
    onClickOpenEdit
  };
};

export default useAlbumEdit;
