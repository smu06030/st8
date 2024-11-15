'use client';

import { useParams } from 'next/navigation';
import { useGetAlbumListQuery } from '@/hooks/queries/query/useAlbumQuery';

import Image from 'next/image';
import Loading from '@/app/(root)/(stamp)/loading';
import useModal from '@/hooks/modal/useModal';
import useUserId from '@/hooks/auth/useUserId';
import useImgModal from '@/hooks/album/useImgModal';
import AlbumImgEdit from '@/components/photoalbum/EditAlbumImg';
import ModalAlbumImg from '@/components/photoalbum/ModalAlbumImg';
import useAlbumDelete from '@/hooks/album/useAlbumDelete';

const RegionDetail = () => {
  const userId = useUserId();
  const { region } = useParams<{ region: string }>();
  const regionTitle = decodeURIComponent(region);
  const { data: albumListData, isLoading, isError } = useGetAlbumListQuery(userId);

  const { selectedImgUrl, imgModal, onClickImgModal, setImgModal, activeImgId, currentIndex, setCurrentIndex } =
    useImgModal();
  const { edit, setEdit, deleteId, onHandleDelete, selectPhotoList } = useAlbumDelete();
  const { closeModal, openModal, Modal, isOpen } = useModal();

  const regionPhoto = albumListData?.filter((item) => item.region === regionTitle) || [];

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (isError) return <div>데이터를 가져오지 못하였습니다.</div>;

  return (
    <div className="pc-inner-width mt-[64px] lg:pb-[535px]">
      <h2 className="mt-[38px] border-b border-[#9C9C9C] py-[14px] font-semiBold text-[24px] text-[#004157] mo-only:mx-[24px]">
        {regionTitle}
      </h2>
      <ul className="flex justify-end mo-only:mx-[24px]">
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
              {/* {deleteId.length > 0 && <span> ({deleteId.length > 0 ? `${deleteId.length}` : 0}개)</span>} */}
            </span>
          )}
          {/* mo */}
          <span className="lg:hidden">삭제</span>
        </button>
      </ul>
      <ul className="pc-inner-width mt-[32px] grid grid-cols-3 gap-[6px] lg:grid-cols-7">
        {regionPhoto?.map((item, index) => (
          <li
            onClick={() => {
              if (!edit) {
                onClickImgModal(item.photoImg, item.id, index);
                openModal();
              } else {
                deleteId.includes(item.id);
                selectPhotoList(item.id);
              }
            }}
            key={item.id}
            className={`${deleteId.includes(item.id) && 'border-red-500'} relative aspect-square overflow-hidden border`}
          >
            {item.photoImg && (
              <>
                <Image
                  src={item.photoImg}
                  alt=""
                  width={200}
                  height={200}
                  priority
                  className="h-full w-full object-cover"
                />
              </>
            )}
          </li>
        ))}
      </ul>
      {isOpen && (
        <ModalAlbumImg
          Modal={Modal}
          setImgModal={setImgModal}
          selectedImgUrl={selectedImgUrl}
          regionPhoto={regionPhoto}
          activeImgId={activeImgId}
          setCurrentIndex={setCurrentIndex}
          currentIndex={currentIndex}
        />
      )}
      {edit && <AlbumImgEdit deleteId={deleteId} onHandleDelete={onHandleDelete} />}
    </div>
  );
};

export default RegionDetail;
