import React from 'react';

const MyInfo = () => {
  return (
    <div className="p-10">
      <h6 className="mb-4 font-bold">내 정보</h6>

      <div className="mb-4 flex items-center justify-between rounded-2xl bg-gray-300 p-6">
        <p>지금까지 모은 스탬프</p>
        <span className="text-2xl font-bold">6개</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex h-24 items-center justify-center rounded-2xl bg-gray-300 p-6">
          <p>나의 발자취</p>
        </div>
        <div className="row-span-2 flex h-52 items-center justify-center rounded-2xl bg-gray-300 p-6">
          <p>내가 찜한 여행지</p>
        </div>
        <div className="flex h-24 items-center justify-center rounded-2xl bg-gray-300 p-6">
          <p> 나의 추억들</p>
        </div>
      </div>
    </div>
  );
};

export default MyInfo;
