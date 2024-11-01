import React from 'react';

const Toptitle = ({ activeTab, edit, onClickTab, setEdit, onHandleDelete }) => {
  return (
    <div>
      <h2 className="mx-[24px] mt-[38px] border-b border-[#9C9C9C] py-[14px] font-black text-[24px] text-[#004157]">
        나의 추억들
      </h2>

      {/* 전체보기-지역별 탭버튼 */}
      <ul className="mx-[24px] flex justify-between">
        <div className="flex">
          <li
            className={`albumTab cursor-pointer px-[12px] py-[18px] ${activeTab === 'allTab' ? 'active' : ''}`}
            onClick={() => onClickTab('allTab')}
          >
            전체보기
          </li>
          <li
            className={`albumTab cursor-pointer px-[12px] py-[18px] ${activeTab === 'rigionTab' ? 'active' : ''}`}
            onClick={() => onClickTab('rigionTab')}
          >
            지역별
          </li>
        </div>
        <div>
          <button
            className={`text-${edit ? 'red-500' : 'black'} px-[12px] py-[18px]`}
            onClick={() => setEdit((prev) => !prev)}
          >
            편집
          </button>
          {/* {edit && (
            <button className={`text-${edit ? 'red-500' : 'black'} px-[12px] py-[18px]`} onClick={onHandleDelete}>
              삭제
            </button>
          )} */}
        </div>
      </ul>
    </div>
  );
};

export default Toptitle;
