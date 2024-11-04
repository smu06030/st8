'use client';

import { useState, Dispatch, SetStateAction, ChangeEvent } from 'react';
import CategoryModal from '@/components/photoalbum/CategoryModal';

interface AddAlbumParamsType {
  setImgSrc: Dispatch<React.SetStateAction<string[]>>;
  imgSrc: string[];
  AlbumAddMutation: any;
  activeTab: string;
  item: string;
}

const AddPhotoBtn = ({ imgSrc, setImgSrc, AlbumAddMutation, activeTab, item }: AddAlbumParamsType) => {
  const [isRigionModal, setIsRigionModal] = useState(false);
  const [regionCate, setRegionCate] = useState(item);

  // 파일 업로드 시 액션
  const OnChangePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = (e) => {
        if (typeof e.target?.result === 'string' && e.target.result) {
          if (activeTab === 'allTab') {
            setImgSrc((prev) => [...prev, e.target!.result as string]); //상태저장 + 순회하면서 저장하니가 값 쌓이게
            setIsRigionModal(true);
          } else if (activeTab === 'rigionTab') {
            setImgSrc((prev) => {
              const imgArr: string[] = [...prev, e.target?.result as string];
              onHandleUpload(imgArr); // 배치업데이트(값이 언제 들어올지 보장 안되어서 직접 값을 전달)
              return imgArr;
            });
            setRegionCate(item);
          }
        }
      };
    });
  };

  const onHandleUpload = (imgArr: string | string[]) => {
    const imgs = Array.isArray(imgArr) ? imgArr : imgSrc;
    if (imgs.length > 0) {
      imgs.forEach((src) => {
        AlbumAddMutation.mutate({ imgs: src, regionCate });
      });
      alert('앨범이 추가되었습니다.');
      setImgSrc([]);
      if (activeTab === 'allTab') {
        setIsRigionModal(false);
      }
    }
  };
  //인풋과 라벨 연결값이 텍스트로 넣어놓음 -> 고정값으로 지칭하는 지역이름이 같아 계속 처음 지역에만 이미지가 넣어짐
  //인풋과 라벨 연결값은 유니크한값으로 지역이름의 변수로 변경 -> 각 지역별로 이미지는 들어가지만 전체보기에서 파일자체가 열리지않음
  //->기존 고정변수명+유니크한값으로 변수명을 수정함
  return (
    <li className={`${activeTab === 'rigionTab' ? 'add-photo-btn' : ''} relative`}>
      <input
        id={`fileInput-${item}`}
        className="hidden"
        type="file"
        accept="image/*"
        multiple
        onChange={OnChangePhoto}
      />
      <label
        htmlFor={`fileInput-${item}`}
        className="flex aspect-square cursor-pointer items-center justify-center bg-[#004157] text-[50px] text-white hover:bg-[#1b4755]"
      >
        +
      </label>

      {/* 팝업 */}
      {isRigionModal && <CategoryModal onHandleUpload={onHandleUpload} setRegionCate={setRegionCate} />}
    </li>
  );
};

export default AddPhotoBtn;
