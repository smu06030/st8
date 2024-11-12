import { Dispatch } from 'react';

interface AlbumTopParamsType {
  activeTab: string;
  edit: boolean;
  onClickTab: (tab: string) => void;
  setEdit: Dispatch<React.SetStateAction<boolean>>;
  onHandleDelete: () => Promise<void>;
  deleteId: number[];
}

const Toptitle = ({ activeTab, edit, onClickTab, setEdit, deleteId, onHandleDelete }: AlbumTopParamsType) => {
  return (
    <div>
      <h2 className="mt-[38px] border-b border-[#9C9C9C] py-[14px] font-semiBold text-[24px] text-[#004157] lg:mt-[64px] mo-only:mx-[24px]">
        나의 추억들
      </h2>

      {/* 전체보기-지역별 탭버튼 */}
      <ul className="flex justify-between mo-only:mx-[24px]">
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
            <div className="flex items-center">
              <button
                className={`text-${edit ? '[#D22730]' : '[#9C9C9C]'} px-[12px] py-[18px]`}
                onClick={() => setEdit((prev) => !prev)}
              >
                {/* pc */}
                {edit ? (
                  <span className="hidden cursor-pointer lg:inline" onClick={onHandleDelete}>
                    삭제하기
                    {deleteId.length > 0 && <span> ({deleteId.length > 0 ? `${deleteId.length}` : 0}개)</span>}
                  </span>
                ) : (
                  <span className="hidden cursor-pointer lg:inline">
                    삭제하기
                    {deleteId.length > 0 && <span> ({deleteId.length > 0 ? `${deleteId.length}` : 0}개)</span>}
                  </span>
                )}
                {/* mo */}
                <span className="lg:hidden">삭제</span>
              </button>
            </div>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Toptitle;
