'use client';

import { useRouter } from 'next/navigation';
import { convertImageToAvif } from '@/components/photoalbum/convertImageToAvif';
import { useState, Dispatch, ChangeEvent, useEffect } from 'react';

import useModal from '@/hooks/modal/useModal';
import useUserId from '@/hooks/auth/useUserId';
import Icon from '@/components/common/Icons/Icon';
import imageCompression from 'browser-image-compression';
import RegionCategoryModal from '@/components/common/Modal/AlbumRegionCategoryModal';

interface AddAlbumParamsType {
  setImgSrc: Dispatch<React.SetStateAction<string[]>>;
  imgSrc: string[];
  postAlbumMutate: any;
  activeTab: string;
  item: string;
}

const AlbumAddBtn = ({ imgSrc, setImgSrc, postAlbumMutate, activeTab, item }: AddAlbumParamsType) => {
  const userId = useUserId();
  const router = useRouter();

  const SelectRegion = activeTab === 'rigionTab' ? item : activeTab === 'allTab' ? '서울' : '';
  const [regionCate, setRegionCate] = useState(SelectRegion);
  const [currentRegion, setCurrentRegion] = useState(''); //지칭한값이 내가 준 지역이 맞는지 확인용
  const { closeModal, openModal, Modal, isOpen } = useModal();

  useEffect(() => {
    if (imgSrc && activeTab === 'rigionTab' && currentRegion === item) {
      onHandleUpload(imgSrc);
    }
  }, [imgSrc, currentRegion]);

  // 로그인유저 유무 확인
  const onClickUserCheck = (e: any) => {
    e.stopPropagation();
    if (!userId) {
      alert('로그인이 필요한 서비스 입니다.');
      router.push('/login');
      return true;
    }
    return false;
  };
  // 파일선택창 열리기 전 로그인여부 확인
  const onClickFileInput = (e: React.MouseEvent<HTMLInputElement>) => {
    if (onClickUserCheck(e)) {
      e.preventDefault();
    }
  };

  // 파일 업로드 시 액션
  const OnChangePhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    if (onClickUserCheck(e)) return;

    const files = e.target.files;
    setCurrentRegion(e.target.id.split('-')[1]);
    if (!files) return;

    const imgSrcArray: string[] = await Promise.all(
      Array.from(files).map(async (file) => {
        // 파일 압축
        const compressedImage = await imageCompression(file, {
          maxSizeMB: 1, // 1MB
          maxWidthOrHeight: 1024, // 이미지의 최대 가로 또는 세로 길이를 1024로 제한
          useWebWorker: true // 압축 작업이 메인 스레드에 영향을 미치지 않도록 설정
        });

        // 압축파일 AVIF 형식으로 변환
        const avifImage = await convertImageToAvif(compressedImage);

        // AVIF 압축된파일 읽기
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(avifImage);
          reader.onload = () => {
            if (typeof reader.result === 'string') {
              resolve(reader.result);
            }
          };
        });
      })
    );

    // 상태 업데이트를 한 번에 처리
    setImgSrc((prev) => [...prev, ...imgSrcArray]);

    if (activeTab === 'allTab') {
      openModal();
    } else if (activeTab === 'rigionTab') {
      setRegionCate(item);
    }
  };

  // 파일 업로드 함수
  const onHandleUpload = (imgArr: string | string[]) => {
    const imgs = Array.isArray(imgArr) ? imgArr : imgSrc;

    if (imgs.length > 0) {
      imgs.forEach((src) => {
        console.log('regionCate', regionCate);
        postAlbumMutate({ imgs: src, regionCate });
      });
      alert('앨범이 추가되었습니다.');
      setCurrentRegion('');
      setImgSrc([]);
      if (activeTab === 'allTab') {
        closeModal();
      }
    }
  };

  return (
    <li
      className={`${activeTab === 'rigionTab' ? 'add-photo-btn' : ''} ${item === '미설정 지역' && 'invisible'} relative`}
    >
      <input
        id={`fileInput-${item}`}
        className="hidden"
        type="file"
        accept="image/*"
        multiple
        onClick={onClickFileInput}
        onChange={OnChangePhoto}
      />
      <label
        htmlFor={`fileInput-${item}`}
        className="plus-hover flex aspect-square cursor-pointer items-center justify-center bg-[#004157] text-[50px] text-white hover:bg-[#8AE2FF]"
      >
        <Icon name="PlusIcon" size={47} color="white" bgColor="transparent" />
      </label>

      {/* 팝업 */}
      {isOpen && (
        <RegionCategoryModal
          Modal={Modal}
          onHandleUpload={onHandleUpload}
          setRegionCate={setRegionCate}
          regionCate={regionCate}
        />
      )}
    </li>
  );
};

export default AlbumAddBtn;
