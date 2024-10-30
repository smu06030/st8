'use client';

import { useEffect, useState } from 'react';
import CategoryModal from '@/components/photoalbum/CategoryModal';

const AddPhotoBtn = ({ imgSrc, setImgSrc, AlbumAddMutation, activeTab, item }) => {
  const [isRigionModal, setIsRigionModal] = useState(false);
  const [regionCate, setRegionCate] = useState('');
  //   const [photoUploaded, setPhotoUploaded] = useState(false);

  // 파일 업로드 시 액션
  const OnChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (e) => {
        if (typeof e.target?.result === 'string' && e.target.result) {
          setImgSrc((prev) => [...prev, e.target.result]);
          //   setPhotoUploaded(true);
          if (activeTab === 'allTab') {
            setIsRigionModal(true);
            console.log('올탭');
          } else if (activeTab === 'rigionTab') {
            console.log('지역탭');
            onHandleUpload();
            setRegionCate(item);
          }
        }
      };
    });
  };

  const onHandleUpload = () => {
    if (imgSrc.length > 0) {
      imgSrc.forEach((src) => {
        AlbumAddMutation.mutate({ imgSrc: src, regionCate });
      });
      alert('앨범이 추가되었습니다.');
      if (activeTab === 'allTab') {
        setIsRigionModal(false);
      }
    }
  };

  return (
    <li>
      <input id="fileInput" className="hidden" type="file" accept="image/*" multiple onChange={OnChangePhoto} />
      <label
        htmlFor="fileInput"
        className="flex h-[200px] cursor-pointer items-center justify-center bg-[#D9D9D9] text-[50px] text-white hover:bg-[red]"
      >
        +
      </label>

      {/* 팝업 */}
      {isRigionModal && <CategoryModal onHandleUpload={onHandleUpload} setRegionCate={setRegionCate} />}
    </li>
  );
};

export default AddPhotoBtn;

//지역별 사진추가시 지역별 서울만 추가댐..
//지역별 사진추가 두번은안댐...
