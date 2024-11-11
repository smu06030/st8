'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import ModalAlbumImg from '@/components/photoalbum/ModalAlbumImg';
import AddPhotoBtn from '@/components/photoalbum/AddPhotoBtn';
import Toptitle from '@/components/photoalbum/AlbumTitleTab';
import EditAlbumImg from '@/components/photoalbum/EditAlbumImg';

import useAlbumDelete from '@/hooks/useAlbumDelete';
import useImgModal from '@/hooks/useImgModal';
import Loading from '@/app/(root)/(stamp)/loading';
import useUserId from '@/hooks/useUserId';
import { useGetAlbumListQuery } from '@/queries/query/useAlbumQuery';
import { usePostAlbumMutation } from '@/queries/mutation/useAlbumMutation';

const AlbumList = () => {
  const userId = useUserId();
  const { data: albumListData, isLoading, isError } = useGetAlbumListQuery(userId);
  const { mutate: postAlbumMutate } = usePostAlbumMutation();

  const {
    selectedImgUrl,
    imgModal,
    onClickImgModal,
    setImgModal,
    activeImgId,
    setActiveImgId,
    currentIndex,
    setCurrentIndex
  } = useImgModal();
  const { edit, setEdit, deleteId, setDeleteId, selectPhotoList, onHandleDelete } = useAlbumDelete();

  const [imgSrc, setImgSrc] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('allTab');

  //이미지팝업에 전달할 앨범전체이미지
  const regionPhoto = albumListData;

  useEffect(() => {
    if (regionPhoto) {
      const index = regionPhoto.findIndex((photo) => photo.id === activeImgId); //클릭한 이미지의 인덱스
      setCurrentIndex(index);
    }
  }, [activeImgId, regionPhoto, setCurrentIndex]);

  //편집안할땐 체크 다 풀기
  useEffect(() => {
    if (!edit) setDeleteId([]);
  }, [edit, setDeleteId]);

  //탭 액션
  const onClickTab = (tab: string) => {
    setActiveTab(tab);
  };

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (isError) return <div>데이터를 가져오지 못하였습니다.</div>;

  //유저가 등록한 지역이름들(중복_지역이름제거)
  const filterRigionTitle = albumListData ? [...new Set(albumListData?.map((item) => item.region))] : [];
  //유저가 등록한 지역의 포토들
  const filterRigionPhoto = filterRigionTitle.map(
    (title) => albumListData?.filter((item) => item.region === title) || []
  );

  // console.log('filterRigionTitle', filterRigionTitle);
  return (
    <div className="pc-inner-width pb-[200px]">
      <Toptitle
        activeTab={activeTab}
        edit={edit}
        onClickTab={onClickTab}
        setEdit={setEdit}
        onHandleDelete={onHandleDelete}
        deleteId={deleteId}
      />
      {/* 전체보기 */}
      {activeTab === 'allTab' ? (
        <ul className="mt-[32px] grid grid-cols-3 gap-[6px] lg:grid-cols-7">
          <AddPhotoBtn
            imgSrc={imgSrc}
            setImgSrc={setImgSrc}
            postAlbumMutate={postAlbumMutate}
            activeTab={activeTab}
            item=""
          />
          {albumListData?.map((item, index) => (
            <li
              onClick={() => {
                if (!edit) {
                  onClickImgModal(item.photoImg, item.id, index);
                } else {
                  deleteId.includes(item.id);
                  selectPhotoList(item.id);
                }
              }}
              key={item.id}
              className={`${edit && deleteId.includes(item.id) && 'border-2 border-[#D22730]'} relative aspect-square overflow-hidden border`}
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
      ) : (
        <section className="my-[18px] flex flex-col mo-only:mx-[24px]">
          <div className="flex flex-col gap-[34px]">
            {filterRigionTitle.map((item, index) => (
              <div key={item}>
                <div className="flex items-center border-b border-[#9C9C9C]">
                  <h2 className="py-[14px] font-bold text-[24px]">{item}</h2>
                </div>
                <ul
                  className={`relative mt-[16px] grid grid-cols-2 gap-[6px] pr-[20%] lg:pr-[70%] ${item === '미설정 지역' && 'row-start-1'}`}
                >
                  <AddPhotoBtn
                    imgSrc={imgSrc}
                    setImgSrc={setImgSrc}
                    postAlbumMutate={postAlbumMutate}
                    activeTab={activeTab}
                    item={item}
                  />

                  <Link href={`/photo-album/${item}`} className={`${item === '미설정 지역' && 'row-start-1'}`}>
                    <li
                      className="relative h-full w-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${filterRigionPhoto[index]?.[0]?.photoImg})`
                      }}
                    >
                      <span className={`absolute bottom-[-26px] right-0 text-[14px] text-[#4F4F4F]`}>
                        {filterRigionPhoto[index]?.length}장
                      </span>
                    </li>
                  </Link>
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
      {imgModal && (
        <ModalAlbumImg
          setImgModal={setImgModal}
          selectedImgUrl={selectedImgUrl}
          regionPhoto={regionPhoto}
          activeImgId={activeImgId}
          setCurrentIndex={setCurrentIndex}
          currentIndex={currentIndex}
        />
      )}
      {edit && <EditAlbumImg deleteId={deleteId} onHandleDelete={onHandleDelete} />}
    </div>
  );
};

export default AlbumList;
