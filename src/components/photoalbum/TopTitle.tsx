import { Dispatch } from 'react';

interface AlbumTopParamsType {
  activeTab: string;
  edit: boolean;
  onClickTab: (tab: string) => void;
  setEdit: Dispatch<React.SetStateAction<boolean>>;
  onHandleDelete: () => Promise<void>;
}

const Toptitle = ({ activeTab, edit, onClickTab, setEdit }: AlbumTopParamsType) => {
  console.log('edit', edit);
  return (
    <div>
      <h2 className="mx-[24px] mt-[38px] border-b border-[#9C9C9C] py-[14px] font-semiBold text-[24px] text-[#004157]">
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
          {activeTab === 'allTab' && (
            <button
              className={`text-${edit ? '[#D22730]' : '[#9C9C9C]'} px-[12px] py-[18px]`}
              onClick={() => setEdit((prev) => !prev)}
            >
              삭제
            </button>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Toptitle;
