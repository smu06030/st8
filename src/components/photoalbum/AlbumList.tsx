'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import AddPhotoBtn from './AddPhotoBtn';
import { fetchAlbum, addAlbumList, deleteAlbumList } from '@/apis/fetchAlbumList';

const AlbumList = () => {
  const queryClient = useQueryClient();
  const [imgSrc, setImgSrc] = useState<string[]>([]); //이미지url
  const [activeTab, setActiveTab] = useState('allTab'); //탭상태
  const [edit, setEdit] = useState(false);
  const [deleteId, setDeleteId] = useState<number[]>([]);
  // console.log('deleteId', deleteId);
  //탭엑션
  const onClickTab = (tab: string) => {
    setActiveTab(tab);
  };

  //useMutation(추가)
  const AlbumAddMutation = useMutation({
    mutationFn: addAlbumList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['photo'] });
      // queryClient.refetchQueries(['photo']);
    },
    onError: (error) => {
      console.error('MutationError:', error);
    }
  });

  //useMutation(삭제)
  const deleteAlbumListmutation = useMutation({
    mutationFn: deleteAlbumList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['photo'] });
    },
    onError: (error) => {
      console.error('삭제 중 오류 발생:', error);
    }
  });

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

  const onHandleDelete = async () => {
    if (deleteId.length === 0) {
      alert('선택된 앨범이 없습니다.');
      return;
    } else if (window.confirm('앨범에서 삭제하시겠습니까?')) {
      await deleteAlbumListmutation.mutate(deleteId);
      alert('삭제되었습니다.');
    }
  };

  //useQuery : 앨범전체테이블 = albumListData
  const {
    data: albumListData,
    isPending,
    isError
  } = useQuery({
    queryKey: ['photo'],
    queryFn: fetchAlbum
    // refetchOnWindowFocus: true
  });
  //   console.log('albumListData', albumListData);
  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  //유저가 등록한 지역이름들(중복_지역이름제거)
  const filterRigionTitle = albumListData ? [...new Set(albumListData?.map((item) => item.region))] : [];
  //유저가 등록한 지역의 포토들
  const filterRigionPhoto = filterRigionTitle.map(
    (title) => albumListData?.filter((item) => item.region === title) || []
  );

  // console.log('albumListData', albumListData);
  return (
    <div>
      <h2 className="m-[24px] border-b border-black pb-[10px] font-bold text-[24px]">나의 추억들</h2>

      {/* 전체보기-지역별 탭버튼 */}
      <ul className="mx-[24px] flex gap-[10px]">
        <li
          className={`albumTab cursor-pointer ${activeTab === 'allTab' ? 'active' : ''}`}
          onClick={() => onClickTab('allTab')}
        >
          전체보기
        </li>
        <li
          className={`albumTab cursor-pointer ${activeTab === 'rigionTab' ? 'active' : ''}`}
          onClick={() => onClickTab('rigionTab')}
        >
          지역별
        </li>
        <button className={`text-${edit ? 'red-500' : 'black'}`} onClick={() => setEdit((prev) => !prev)}>
          편집
        </button>
        {edit && (
          <button className={`text-${edit ? 'red-500' : 'black'}`} onClick={onHandleDelete}>
            삭제
          </button>
        )}
      </ul>
      {/* 전체보기 */}
      {activeTab === 'allTab' ? (
        <ul className="mt-4 grid grid-cols-3 gap-[5px]">
          <AddPhotoBtn
            imgSrc={imgSrc}
            setImgSrc={setImgSrc}
            AlbumAddMutation={AlbumAddMutation}
            activeTab={activeTab}
            item=""
          />
          {albumListData?.map((item, index) => (
            <li key={item.id} className="h-[200px] overflow-hidden border border-black">
              {item.photoImg && (
                <div>
                  <Image src={item.photoImg} alt="" width={200} height={150} priority className="h-full" />
                  {edit && (
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={deleteId.includes(item.id)} //배열에 들은 아이디가 있어? 트루펄스
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <section className="m-[24px] flex flex-col">
          <div className="flex flex-col gap-[50px]">
            {filterRigionTitle.map((item, index) => (
              <div key={item}>
                <div className="flex items-center border-b border-black">
                  <h2 className="pb-[10px] font-bold text-[24px]">{item}</h2>
                  <span>{filterRigionPhoto[index]?.length}</span>
                </div>
                <ul className="mt-4 grid grid-cols-3 gap-[5px]">
                  <AddPhotoBtn
                    imgSrc={imgSrc}
                    setImgSrc={setImgSrc}
                    AlbumAddMutation={AlbumAddMutation}
                    activeTab={activeTab}
                    item={item}
                  />
                  {filterRigionPhoto[index]?.map((item) => (
                    <li key={item.id} className="h-[200px] overflow-hidden border border-black">
                      {item.photoImg && (
                        <div>
                          <Image src={item.photoImg} alt="" width={200} height={150} priority className="h-full" />
                          {edit && (
                            <input
                              type="checkbox"
                              className="mr-2"
                              checked={deleteId.includes(item.id)} //배열에 들은 아이디가 있어?
                              onChange={() => handleCheckboxChange(item.id)}
                            />
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default AlbumList;
