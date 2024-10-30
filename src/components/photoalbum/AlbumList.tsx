'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import browserClient from '@/utils/supabase/client';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import AddPhotoBtn from './AddPhotoBtn';
import { fetchAlbum } from '@/apis/fetchAlbumList';
import { addAlbumList } from '@/apis/fetchAlbumList';
// '/images/default-image.png'
const AlbumList = () => {
  const queryClient = useQueryClient();
  const [imgSrc, setImgSrc] = useState([]); //이미지url  []
  const [activeTab, setActiveTab] = useState('allTab'); //탭상태
  const [tabState, setTabState] = useState('');

  useEffect(() => {
    console.log(`${activeTab}로 변경`);
    // setTabState()
  }, [activeTab]);

  //탭엑션
  const onClickTab = (tab: string) => {
    setActiveTab(tab);
  };

  //useMutation(추가)
  const AlbumAddMutation = useMutation({
    mutationFn: addAlbumList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['photo'] });
    },
    onError: (error) => {
      console.error('MutationError:', error);
    }
  });

  //useQuery : 앨범전체테이블 = albumListData
  const {
    data: albumListData,
    isPending,
    isError
  } = useQuery({
    queryKey: ['photo'],
    queryFn: fetchAlbum
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

  return (
    <div>
      <h2 className="m-[24px] border-b border-black pb-[10px] text-[24px] font-bold">나의 추억들</h2>

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
      </ul>
      {/* 전체보기 */}
      {activeTab === 'allTab' && (
        <ul className="mt-4 grid grid-cols-3 gap-[5px]">
          <AddPhotoBtn
            imgSrc={imgSrc}
            setImgSrc={setImgSrc}
            AlbumAddMutation={AlbumAddMutation}
            activeTab={activeTab}
          />
          {albumListData?.map((item, index) => (
            <li key={item.id} className="h-[200px] overflow-hidden border border-black">
              {item.photoImg && (
                <Image src={item.photoImg} alt="" width={200} height={150} priority className="h-full" />
              )}
            </li>
          ))}
        </ul>
      )}
      {/* 지역별 */}
      {activeTab === 'rigionTab' && (
        <section className="m-[24px] flex flex-col">
          <div className="flex flex-col gap-[50px]">
            {filterRigionTitle.map((item, index) => (
              <div key={item}>
                <div className="flex items-center border-b border-black">
                  <h2 className="pb-[10px] text-[24px] font-bold">{item}</h2>
                  <span>{filterRigionPhoto[index]?.length}</span>
                </div>
                {/* TODO 불러오기 */}
                <ul className="mt-4 grid grid-cols-3 gap-[5px]">
                  {/* TODO 불러오기 */}
                  <AddPhotoBtn
                    imgSrc={imgSrc}
                    setImgSrc={setImgSrc}
                    AlbumAddMutation={AlbumAddMutation}
                    activeTab={activeTab}
                    item={item}
                  />
                  {/* TODO 슬라이드형식? && 지역별 필터링*/}
                  {filterRigionPhoto[index]?.map((item) => (
                    <li key={item.id} className="h-[200px] overflow-hidden border border-black">
                      {item.photoImg && (
                        <Image src={item.photoImg} alt="" width={200} height={150} priority className="h-full" />
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
