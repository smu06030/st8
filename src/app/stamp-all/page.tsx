import React from 'react';
import StampList from '@/components/stamp/StampList';

const StampAll = () => {
  return (
    <div className="p-[24px]">
      <h3>전체 스탬프</h3>
      <StampList />
    </div>
  );
};

export default StampAll;

/**
 step1 (get)
 스템프 모음 >  더미데이터 기반 전체스탬프 뿌려주기 (완료)
 get으로 수퍼베이스에서 가져와 (완료)
 컴포넌트 클릭 후 스템프 상세로 넘어가게(완료)
 스템프 아이디 가진 정보 가져와서 상세에 펼치기(완료)
 더미데이터 만들기(완료)
 -

 step2 (get)
 최근 얻은 스탬프 날짜기반 뿌리기 (임의 1달)(완료)

 step3 (post)
스템프별 카테고리 생성하기 
스탬프 찍는 모션 레퍼찾기
내 위치 api 연결하기 - 주스텐드로 전역관리하기

 */
