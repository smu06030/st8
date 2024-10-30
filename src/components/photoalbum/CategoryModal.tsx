'use client';

import React, { useState } from 'react';

const CategoryModal = ({ onHandleUpload, setRegionCate }) => {
  const cate = ['서울', '경기', '전남', '제주'];
  //   const [selectedRegion, setSelectedRegion] = useState(regionCate);

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative h-[55vh] w-[85%] rounded-[18px] bg-[#D9D9D9] px-[32px] py-[52px]">
        <h2 className="text-[20px] font-semibold">어느 지역에서 찍은 사진인가요?</h2>
        <div className="flex h-full flex-col items-center justify-center">
          <div className="flex min-h-[80%] w-full flex-col justify-center gap-[20px]">
            <ul className="items-col flex flex-col">
              {/* TODO 스와이프 추후변경 */}
              {cate.map((region, index) => (
                <div key={index}>
                  <input type="checkbox" value={region} onChange={(e) => setRegionCate(e.target.value)} />
                  <label>{region}</label>
                </div>
              ))}
            </ul>
          </div>
          <button onClick={() => onHandleUpload()} className="bg-[#666666] px-[103px] py-[22px] text-white">
            업로드
          </button>
          <label className="flex items-center">
            <input
              type="checkbox"
              //   checked={isRegionNotSet}
              //   onChange={handleCheckboxChange}
              className="mr-2"
            />
            지역을 설정안할래요
          </label>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
