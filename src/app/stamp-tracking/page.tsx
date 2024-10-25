import MyLocation from '@/components/stamp/MyLocation';
// import StampTrack from '@/components/stamp/StampTrack';
import React from 'react';

const StampTracking = () => {
  return (
    <div>
      {/* <StampTrack */}
      <MyLocation />
    </div>
  );
};

export default StampTracking;

/*
step3
현재 내 위치값 가져오기 + 주소로 (완료)

step4
스탬프찍기 클릭시 > 페이지 랜더링되면서 위치값 가져옴(마지막)
위치값을 기준으로 도장 이미지 필터링해서 같은값가진 이미지 놓아야함(완료)
-> 도장카테고리를,,?만들어야하나,,?(완료)
디폴트. : 비활 오파시티 .5(완료)
탭 : 확인창(스탬프를 찍겠습니까?)->확인 : 활성화 오파시티 1
+ 수파베이스에 insert 방문값 true / 지역이름 / 찍힌시간 


각 지역별 이름 어케나오는지 홗인하기
1. 문의하기 1뎁스 이름 각 어케나오는지 
2. 구글에 위도경도값 구해서 직접 넣어서 확인하기
*/
