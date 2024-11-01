'use client';

import { useEffect, useState } from 'react';
import StampActive from './StampActive';
import { AddressPropsType } from '@/types/stamp/AddressProps.types';
import { showErrorMsg } from '@/components/stamp/LocationErrorMsg';
import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '@/utils/fetchUser'; //로그인유저
import { fetchStampList } from '@/apis/fetchStampList'; //로그인유저의 스템프 항목 가져오기
import Link from 'next/link';

interface LocationType {
  lat: number;
  lng: number;
}

const MyLocation = () => {
  // const queryClient = useQueryClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null); //에러상태
  const [address, setAddress] = useState<AddressPropsType>(); //현재주소
  const [visit, setVisit] = useState<boolean>(false); //방문상태
  const [location, setLocation] = useState<LocationType>({ lat: 0, lng: 0 });

  //로그인유저아이디 패치불러오기
  //TODO: 체크유저없어도 실행댐.. 이유가 fetchStampList안에 패치유저 한번더함 수정필요
  useEffect(() => {
    const checkUser = async () => {
      const user = await fetchUser();
      if (!user) return;
      else setUserId(user);
    };
    checkUser();
  }, []);

  //useQuery
  const {
    data: stampList,
    isLoading,
    error: stampListError
  } = useQuery({
    queryKey: ['nowStamp', address?.address_name], //고유키값
    queryFn: async () => {
      if (address && address.address_name) {
        return await fetchStampList(address.address_name!);
      } else return null;
    }, // 주소를 인자로 넘김
    enabled: !!userId
  });

  useEffect(() => {
    if (stampList && stampList.length > 0) {
      setVisit(stampList[0].visited);
    }
  }, [stampList]);
  // console.log('visited', visit);

  const getAddress = async (lat: number, lng: number) => {
    try {
      //주소 데이터를 요청
      const res = await fetch(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`, {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`
        }
      });
      const data = await res.json();
      // console.log('data', data);
      if (data) {
        const addressData = data.documents[0].address; //지번
        setAddress({
          address_name: addressData.address_name,
          // main_building_no: addressData.building_name,
          region_1depth_name: addressData.region_1depth_name,
          region_2depth_name: addressData.region_2depth_name,
          region_3depth_name: addressData.region_3depth_name
          // road_name: addressData.road_name
        });
      }
    } catch (error) {
      setError('주소를 가져오는 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      //현 브라우저가 Geolocation API를 지원하는지 확인
      navigator.geolocation.getCurrentPosition(
        //사용자의 현재 위치를 요청
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          await getAddress(latitude, longitude); //위도경도 인자로 넘기기
        },
        (err) => {
          showErrorMsg(err.message, setError);
        },
        {
          enableHighAccuracy: true, // 정확도 우선 모드
          timeout: 60000, // 1분 이내에 응답 없으면 에러 발생
          maximumAge: 0 // 항상 최신 위치 정보 수집
        }
      );
    } else {
      setError('브라우저가 Geolocation을 지원하지 않습니다.');
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (stampListError) return <div>Failed to load</div>;
  // console.log('location', location);
  return (
    <div className="h-[100vh] p-[24px]">
      {address ? (
        <>
          {/* <p>현재 내 위치 : {address.address_name}</p> */}
          <StampActive address={address} stampList={stampList} setVisit={setVisit} visit={visit} location={location} />
        </>
      ) : (
        <p>{error ? `Error: ${error}` : '위치를 가져오고있습니다...'}</p>
      )}
      {visit && (
        <Link href={'/stamp-all'}>
          <p className={`py-[20px] text-center ${visit && 'animate-fadeUpText'}`}>
            테스트 텍스트입니당~~~~~
            <br />
            테스트 텍스트입니당~~~~~
          </p>
          <button
            className={`bg-secondary-500 w-full rounded-[12px] py-[20px] text-[20px] text-[#fff] ${visit && 'animate-fadeUpBtn'}`}
          >
            스탬프 확인하러 가기
          </button>
        </Link>
      )}
    </div>
  );
};

export default MyLocation;

/**
 * 스탬프 확인하러가기 버튼
 -> 도장 활성화 됬을때 나타나기
 -> 로그인유저의 전체항목 가져와(로그인유저패치함수,fetchStampList)
 -> 




 * 추후지울예정
Geolocation API는 CSR에서만 작동할 수 있다.
Geolocation API는 비동기적으로 동작한다.
처음리랜더링됬을때 작동하게하고, 항상 최신 위치정보를 수집하게한다.
1분이내로 카운트 ㄱㄱ
깃허브안올라가게 .env.local (주의!!!)
 */
