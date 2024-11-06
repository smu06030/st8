import React from 'react';
import StampList from '@/components/stamp/StampList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '스탬프',
  description: '스탬프 페이지 입니다.'
};

const StampAll = () => {
  return (
    <div className="px-[24px] py-[34px]">
      <h3 className="font-semiBold text-[32px] leading-[41.6px] text-[#008EBD]">
        모아와 함께
        <br />
        모아온 스탬프에요.
      </h3>
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

 step2 (post)
스템프별 카테고리 생성하기 (완료)
스탬프 찍는 모션 레퍼찾기
내 위치 api 연결하기(완료)

 */
