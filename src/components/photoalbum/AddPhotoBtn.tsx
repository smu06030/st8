'use client';

import { useEffect, useState } from 'react';
import CategoryModal from '@/components/photoalbum/CategoryModal';

const AddPhotoBtn = ({ imgSrc, setImgSrc, AlbumAddMutation, activeTab, item }) => {
  const [isRigionModal, setIsRigionModal] = useState(false);
  const [regionCate, setRegionCate] = useState(item);

  useEffect(() => {
    if (activeTab === 'rigionTab') {
      setRegionCate(item);
    }
  }, [item, regionCate]);

  // 파일 업로드 시 액션
  const OnChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files; //클릭한대상의 이미지를 저장
    if (!files) return; //유효성체크
    console.log(item);
    Array.from(files).forEach((file) => {
      //N개를 배열로 만들어서 + 파일여러개일때 갯수만큼 순회
      const fileReader = new FileReader(); //파일읽기용 객체
      fileReader.readAsDataURL(file); //file저장
      fileReader.onload = (e) => {
        if (typeof e.target?.result === 'string' && e.target.result) {
          if (activeTab === 'allTab') {
            setImgSrc((prev) => [...prev, e.target.result]); //상태저장 + 순회하면서 저장하니가 값 쌓이게
            setIsRigionModal(true); //모달열기
          } else if (activeTab === 'rigionTab') {
            setImgSrc((prev) => {
              const imgArr = [...prev, e.target.result];
              onHandleUpload(imgArr); // 배치업데이트(값이 언제 들어올지 보장 안되어서 직접 값을 전달)
              return imgArr;
            });
            setRegionCate(item);
          }
          e.target.value = '';
        }
      };
    });
  };

  // const OnChangePhoto = (e: React.ChangeEvent<HTMLInputElement>, itemh) => {
  //   const files = e.target.files;
  //   // console.log('files', files);
  //   if (!files) return;
  //   console.log(itemh);
  //   Array.from(files).forEach((file) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);
  //     fileReader.onload = (e) => {
  //       if (typeof e.target?.result === 'string' && e.target.result) {
  //         setImgSrc((prev) => [...prev, e.target.result]);
  //         if (activeTab === 'allTab') {
  //           //전체보기탭 - 모달열기 (카테고리선택)
  //           setIsRigionModal(true);
  //           console.log('올탭');
  //         } else if (activeTab === 'rigionTab') {
  //           //지역별탭 - 바로 업로드
  //           console.log('지역탭'); //이건 인지함
  //           // setRegionCate(item); //해당지역이름으로 값 설정
  //         }
  //       }
  //     };
  //   });
  // };

  //supabase에 (지역값,이미지url)값 전달하면서 데이터 추가됨

  const onHandleUpload = (imgArr) => {
    const imgs = imgArr ? imgArr : imgSrc;
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
    <li>
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
//지역별 탭에서 온체인지포토 이벤ㄴ트 실행시 지역이름이 카태고리값으로 킵되고
