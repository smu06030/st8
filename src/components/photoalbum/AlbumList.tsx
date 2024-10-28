'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import browserClient from '@/utils/supabase/client';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import CategoryModal from './CategoryModal';
import AddPhotoBtn from './AddPhotoBtn';

const fetchAlbum = async () => {
  const { data, error } = await browserClient.from('album').select('*');

  if (error) {
    console.error('가져오기 오류4:', error.message);
  }
  console.log('data', data);
  return data;
};

//뮤테이션 함수 만들기(수파베이스 값 추가)
const addAlbumList = async (imgSrc: string) => {
  const { data, error } = await browserClient.from('album').insert({
    photoImg: imgSrc
  });
  if (error) console.log('error', error);
  return data;
};

const AlbumList = () => {
  const queryClient = useQueryClient();
  const [isRigionModal, SetIsRigionModal] = useState(false); //모달상태
  const [imgSrc, setImgSrc] = useState<string>('/images/default-image.png'); //이미지url
  const [activeTab, setActiveTab] = useState('allTab'); //탭상태

  const openCategory = () => SetIsRigionModal(true);
  const closeCategory = () => SetIsRigionModal(false);

  const onClickTab = (tab: string) => {
    setActiveTab(tab);
  };
  //useMutation(추가)
  const AlbumAddMutation = useMutation({
    mutationFn: addAlbumList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['photo'] });
    }
  });

  //useQuery
  const {
    data: albumListData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['photo'], //고유키값
    queryFn: fetchAlbum // 주소를 인자로 넘김
  });
  console.log('albumListData', albumListData);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  const filterRigionTitle = [...new Set(albumListData?.map((item) => item.region))];
  const filterRigionPhoto = filterRigionTitle.map(
    (title) => albumListData?.filter((item) => item.region === title) || []
  );

  return (
    <div>
      <h2 className="m-[24px] border-b border-black pb-[10px] text-[24px] font-bold">나의 추억들</h2>

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
        <button onClick={openCategory} className="cursor-pointer bg-[#e5e7eb] px-[15px] py-[10px] hover:bg-[#e1e1e1]">
          모달확인용버튼
        </button>
      </ul>
      {/* 전체보기 */}
      {activeTab === 'allTab' && (
        <ul className="mt-4 grid grid-cols-3 gap-[5px]">
          <AddPhotoBtn setImgSrc={setImgSrc} AlbumAddMutation={AlbumAddMutation} />
          {albumListData?.map((item, index) => (
            <li key={item.id} className="h-[200px] overflow-hidden border border-black">
              <Image src={item.photoImg} alt="" width={200} height={150} priority className="h-full" />
            </li>
          ))}
        </ul>
      )}
      {/* 지역별 */}
      {activeTab === 'rigionTab' && (
        <section className="m-[24px] flex flex-col">
          <div className="flex flex-col gap-[50px]">
            {/* TODO 불러오기 */}
            {filterRigionTitle.map((item, index) => (
              <div key={item}>
                <div className="flex items-center border-b border-black">
                  <h2 className="pb-[10px] text-[24px] font-bold">{item}</h2>
                  <span>{filterRigionPhoto[index]?.length}</span>
                </div>
                {/* TODO 불러오기 */}
                <ul className="mt-4 grid grid-cols-3 gap-[5px]">
                  {/* TODO 불러오기 */}
                  <AddPhotoBtn setImgSrc={setImgSrc} AlbumAddMutation={AlbumAddMutation} />
                  {/* TODO 슬라이드형식? && 지역별 필터링*/}
                  {filterRigionPhoto[index]?.map((item, index) => (
                    <li key={item.id} className="h-[200px] overflow-hidden border border-black">
                      <Image src={item.photoImg} alt="" width={200} height={150} priority className="h-full" />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
      {/* 팝업 */}
      {isRigionModal && <CategoryModal closeCategory={closeCategory} />}
    </div>
  );
};

export default AlbumList;
