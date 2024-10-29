'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import browserClient from '@/utils/supabase/client';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

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
  const [imgSrc, setImgSrc] = useState<string>('/images/default-image.png');

  //useMutation(추가)
  const AlbumAddMutation = useMutation({
    mutationFn: addAlbumList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['photo'] });
    }
  });

  const OnChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 옵셔널 체이닝
    // e.target.files가 있으면 우항 실행
    // 없으면 undefined
    const file = e.target.files?.[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    // 로딩이 완료되면 실행할 콜백 함수 등록
    fileReader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        setImgSrc(e.target.result);
        AlbumAddMutation.mutate(e.target.result);
        alert('앨범이 추가되었습니다.');
      }
    };
  };

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

  return (
    <div>
      <h2 className="m-[24px] border-b border-black pb-[10px] text-[24px] font-bold">나의 추억들</h2>
      <ul className="mx-[24px] flex gap-[10px]">
        <li className="cursor-pointer">전체보기</li>
        <li className="cursor-pointer">지역별</li>
      </ul>
      <ul className="mt-4 grid grid-cols-3 gap-[5px]">
        <li>
          <input id="fileInput" className="hidden" type="file" accept="image/*" onChange={OnChangePhoto} />
          <label
            htmlFor="fileInput"
            className="flex h-[200px] cursor-pointer items-center justify-center bg-[#D9D9D9] text-[50px] text-white hover:bg-[red]"
          >
            +
          </label>
        </li>
        {albumListData?.map((item, index) => (
          <li key={item.id} className="h-[200px] overflow-hidden border border-black">
            <Image src={item.photoImg} alt="" width={200} height={150} priority className="h-full" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumList;
