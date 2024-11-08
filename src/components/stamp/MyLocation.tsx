'use client';

import { useEffect, useState } from 'react';
import StampActive from './StampActive';
import { AddressPropsType } from '@/types/stamp/addressProps.type';
import { showErrorMsg } from '@/components/stamp/LocationErrorMsg';

import browserClient from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import useUserId from '@/hooks/useUserId';
import Link from 'next/link';
import Icon from '@/components/common/Icons/Icon';
import Loading from '@/app/(root)/(stamp)/loading';
import useModal from '@/hooks/useModal';
import AliasCheckModal from '@/components/common/Modal/AliasCheckModal';
import { useGetStampLocationQuery } from '@/queries/query/useStampQuery';
import { usePatchAliasMutation } from '@/queries/mutation/useAliasMutation';
import { getStampLocation } from '@/components/stamp/getStampLocation';

interface LocationType {
  lat: number;
  lng: number;
}

const MyLocation = () => {
  const userId = useUserId();
  const [error, setError] = useState<string | null>(null); //에러상태
  const [address, setAddress] = useState<AddressPropsType>(); //현재주소
  const [visit, setVisit] = useState<boolean>(false); //방문상태
  const [location, setLocation] = useState<LocationType>({ lat: 0, lng: 0 });
  const [parentFocused, setParentFocused] = useState(false);
  const [aliasLocation, setAliasLocation] = useState<string | null>(null); //장소별칭
  const { openModal, Modal, isOpen } = useModal();
  const patchAliasMutation = usePatchAliasMutation();
  // const [saveAlias,setSaveAlias] = useState(stampList?.[0]?.aliasLocation)

  // const fetchLocationStamp = async (address: string) => {
  //   const { data: userLocationStamp, error } = await browserClient
  //     .from('stamp')
  //     .select('*')
  //     .eq('user_id', userId)
  //     .eq('address', address);

  //   if (error) {
  //     console.error('위치 기반 스탬프 리스트 가져오기 오류 :', error.message);
  //     throw new Error('위치 기반 스탬프 리스트 데이터를 가져오는 중 오류가 발생했습니다.' + error.message);
  //   }
  //   return userLocationStamp;
  // };

  const {
    data: stampList,
    isLoading,
    isError: stampListError
  } = useGetStampLocationQuery(address?.address_name, userId);
  // useQuery({
  //   queryKey: ['nowStamp', address?.address_name], //고유키값
  //   queryFn: async () => {
  //     if (address && address.address_name) {
  //       return await getStampLocation(address.address_name!);
  //     } else return null;
  //   }, // 주소를 인자로 넘김
  //   enabled: !!userId
  // });

  //저장된스탬프의 방문여부 저장
  useEffect(() => {
    if (stampList && stampList.length > 0) {
      setVisit(stampList[0].visited);
    }
  }, [stampList]);

  const onClickAliasAdd = (alias: string) => {
    if (userId) {
      patchAliasMutation.mutate({ alias, userId, address: address?.address_name ?? '' });
    } else {
      console.error('유저아이디가 없습니다.');
      return;
    }
  };

  useEffect(() => {
    if (aliasLocation) {
      onClickAliasAdd(aliasLocation);
    }
  }, [aliasLocation]);

  // 카카오맵 주소값 가져오기
  const getAddress = async (lat: number, lng: number) => {
    try {
      const res = await fetch(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`, {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`
        }
      });
      const data = await res.json();
      if (data) {
        const addressData = data.documents[0].address;
        setAddress({
          address_name: addressData.address_name,
          region_1depth_name: addressData.region_1depth_name,
          region_2depth_name: addressData.region_2depth_name,
          region_3depth_name: addressData.region_3depth_name
        });
      }
    } catch (error) {
      console.log('주소를 가져오는 중 오류가 발생했습니다.', error);
    }
  };

  // Geolocation API 로 유저의 위도,경도값 추출
  useEffect(() => {
    if ('geolocation' in navigator) {
      //현 브라우저가 Geolocation API를 지원하는지 확인
      navigator.geolocation.getCurrentPosition(
        //사용자의 현재 위치를 요청
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          await getAddress(latitude, longitude);
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
      console.log('오류가 발생했습니다.');
    }
  }, []);

  useEffect(() => {
    if (isLoading) {
      console.log('1');
    } else if (stampListError) {
      console.error('Error loading stampList');
    } else if (stampList) {
      console.log(stampList);
    }
  }, [stampListError, isLoading, stampList]);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const saveAlias = stampList?.[0]?.aliasLocation;
  // console.log('stampList', stampList?.[0]?.aliasLocation);
  return (
    <div className="flex flex-col px-[24px] pt-[36px]" style={{ height: 'calc(100vh - 64px)' }}>
      {address ? (
        <>
          <StampActive
            address={address}
            stampList={stampList}
            setVisit={setVisit}
            visit={visit}
            location={location}
            aliasLocation={aliasLocation}
          />
        </>
      ) : (
        <div>{error ? `Error: ${error}` : <Loading />}</div>
      )}
      {visit && (
        <div className="mb-[99px] mt-[36px] flex flex-1 flex-col justify-between">
          <div className="flex flex-col gap-[8px]">
            <label className="px-[6px] py-[8px]">스탬프 별명 설정하기</label>
            <span
              className="flex gap-[6px] rounded-[12px] border border-[#B5B5B5] px-[16px] py-[16px] focus-within:border-[#00688A]"
              onFocus={() => setParentFocused(true)}
              onBlur={() => setParentFocused(false)}
            >
              <Icon
                name="LocationIcon"
                size={28}
                color={`${parentFocused ? '#00688A' : '#9C9C9C'}`}
                bgColor="transparent"
              />
              {/* TODO: 등록된거라면 별칭 보여주기 */}
              <input
                type="text"
                placeholder={`${stampList?.[0]?.aliasLocation ? stampList?.[0]?.aliasLocation : '간단한 장소나 이름을 적어주세요.'}`}
                className="w-full bg-transparent text-[14px] outline-none group-focus-within:text-[#00688A]"
                onChange={(e) => setAliasLocation(e.target.value)}
              />
            </span>
          </div>

          {aliasLocation === null && !saveAlias ? (
            <button
              onClick={openModal}
              className={`w-full rounded-[12px] bg-secondary-500 py-[21px] font-semiBold text-[20px] text-[#004157] ${visit && 'animate-fadeUpBtn'}`}
            >
              스탬프 확인하러 가기
            </button>
          ) : (
            <Link href={'/stamp-all'}>
              <button
                className={`w-full rounded-[12px] bg-secondary-500 py-[21px] font-semiBold text-[20px] text-[#004157] ${visit && 'animate-fadeUpBtn'}`}
              >
                스탬프 확인하러 가기
              </button>
            </Link>
          )}
          {isOpen && <AliasCheckModal Modal={Modal} />}
        </div>
      )}
    </div>
  );
};

export default MyLocation;
