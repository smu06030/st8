'use client';

import React from 'react';

const AddPhotoBtn = ({ setImgSrc, AlbumAddMutation }) => {
  const OnChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 옵셔널 체이닝
    // e.target.files가 있으면 우항 실행
    // 없으면 undefined
    const file = e.target.files?.[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    // 로딩이 완료되면 실행할 콜백 함수 등록
    fileReader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        setImgSrc(e.target.result);
        AlbumAddMutation.mutate(e.target.result);
        alert('앨범이 추가되었습니다.');
      }
    };
  };

  return (
    <li>
      <input id="fileInput" className="hidden" type="file" accept="image/*" onChange={OnChangePhoto} />
      <label
        htmlFor="fileInput"
        className="flex h-[200px] cursor-pointer items-center justify-center bg-[#D9D9D9] text-[50px] text-white hover:bg-[red]"
      >
        +
      </label>
    </li>
  );
};

export default AddPhotoBtn;
