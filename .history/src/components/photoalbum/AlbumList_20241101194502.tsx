'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import ImgModal from '@/components/photoalbum/ImgModal';
import AddPhotoBtn from '@/components/photoalbum/AddPhotoBtn';
import Toptitle from '@/components/photoalbum/TopTitle';
import { useAlbumList, useAlbumAddMutation, useAlbumDeleteMutation } from '@/hooks/useAlbumList';
import useImgModal from '@/hooks/useImgModal';

const AlbumList = () => {
  const { data: albumListData, isPending, isError } = useAlbumList();
  const AlbumAddMutation = useAlbumAddMutation();
  const AlbumDeletemutation = useAlbumDeleteMutation();
  const { selectedImgUrl, imgModal, onClickImgModal, setImgModal, activeImgId, setActiveImgId } = useImgModal();

  const [imgSrc, setImgSrc] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('allTab');
  const [edit, setEdit] = useState(false);
  const [deleteId, setDeleteId] = useState<number[]>([]);

  //편집안할땐 체크 다 풀기
  useEffect(() => {
    if (!edit) setDeleteId([]);
  }, [edit]);

  //탭 액션
  const onClickTab = (tab: string) => {
    setActiveTab(tab);
  };

  //체크이벤트로 아이디값 배열로 담기
  const handleCheckboxChange = (id: number) => {
    setDeleteId((prev) => {
      if (prev.includes(id)) {
        //선택한아이디들에 아이디가 포함되어있으면
        return prev.filter((item) => item !== id); //아이디중복제거
      } else {
        return [...prev, id];
      }
    });
  };

  //선택한이미지 삭제이벤트(유효성검사)
  const onHandleDelete = async () => {
    if (deleteId.length === 0) {
      alert('선택된 앨범이 없습니다.');
      return;
    } else if (window.confirm('앨범에서 삭제하시겠습니까?')) {
      await AlbumDeletemutation.mutate(deleteId);
      alert('삭제되었습니다.');
    }
  };

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  //유저가 등록한 지역이름들(중복_지역이름제거)
  const filterRigionTitle = albumListData ? [...new Set(albumListData?.map((item) => item.region))] : [];
  //유저가 등록한 지역의 포토들
  const filterRigionPhoto = filterRigionTitle.map(
    (title) => albumListData?.filter((item) => item.region === title) || []
  );
  //이미지팝업에 전달할 앨범전체이미지
  const regionPhoto = albumListData;
  console.log('filterRigionPhoto', filterRigionPhoto);
  return (
    <div>
      <Toptitle
        activeTab={activeTab}
        edit={edit}
        onClickTab={onClickTab}
        setEdit={setEdit}
        onHandleDelete={onHandleDelete}
      />
      {/* 전체보기 */}
      {activeTab === 'allTab' ? (
        <ul className="mt-[16px] grid grid-cols-3 gap-[6px]">
          <AddPhotoBtn
            imgSrc={imgSrc}
            setImgSrc={setImgSrc}
            AlbumAddMutation={AlbumAddMutation}
            activeTab={activeTab}
            item=""
          />
          {albumListData?.map((item) => (
            <li
              key={item.id}
              className={`${edit && deleteId.includes(item.id) && 'border-red-500'} relative aspect-square overflow-hidden border`}
            >
              {item.photoImg && (
                <>
                  <Image
                    onClick={() => onClickImgModal(item.photoImg, item.id)}
                    src={item.photoImg}
                    alt=""
                    width={200}
                    height={200}
                    priority
                    className="h-full w-full object-cover"
                  />
                  {edit && (
                    <input
                      type="checkbox"
                      className="absolute right-[10px] top-[10px] h-6 w-6 appearance-none rounded-full border border-gray-300 text-red-500 checked:border-red-500 checked:bg-[red]"
                      checked={deleteId.includes(item.id)} //배열에 들은 아이디가 있어? 트루펄스
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <section className="mx-[24px] my-[18px] flex flex-col">
          <div className="flex flex-col gap-[34px]">
            {filterRigionTitle.map((item, index) => (
              <div key={item}>
                <div className="flex items-center border-b border-[#9C9C9C]">
                  <h2 className="py-[14px] font-bold text-[24px]">{item}</h2>
                </div>
                <ul className="mt-[16px] grid grid-cols-[.8fr_.8fr] gap-[6px]">
                  <AddPhotoBtn
                    imgSrc={imgSrc}
                    setImgSrc={setImgSrc}
                    AlbumAddMutation={AlbumAddMutation}
                    activeTab={activeTab}
                    item={item}
                  />
                  <Link href={`/photo-album/${item}`}>
                    <li
                      className="h-full w-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${filterRigionPhoto[index]?.[0]?.photoImg})`
                      }}
                    ></li>
                  </Link>
                </ul>
                <span>{filterRigionPhoto[index]?.length}장</span>
              </div>
            ))}
          </div>
        </section>
      )}
      {imgModal && (
        <ImgModal
          setImgModal={setImgModal}
          selectedImgUrl={selectedImgUrl}
          regionPhoto={regionPhoto}
          activeImgId={activeImgId}
          setActiveImgId={setActiveImgId}
        />
      )}
    </div>
  );
};

export default AlbumList;
