'use client';

import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import Loading from '@/app/stamp-map/loading';
import Icon from '@/components/common/Icons/Icon';
import browserClient from '@/utils/supabase/client';
import { fetchUser } from '@/utils/fetchUser';
import { fetchStampList } from '@/apis/fetchStampList';
import { AddressPropsType } from '@/types/stamp/AddressProps.types';
import StampActive from '@/components/stamp/StampActive';
import { showErrorMsg } from '@/components/stamp/LocationErrorMsg';

interface LocationType {
  lat: number;
  lng: number;
}

const MyLocation = () => {
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null); //에러상태
  const [address, setAddress] = useState<AddressPropsType>(); //현재주소
  const [visit, setVisit] = useState<boolean>(false); //방문상태
  const [location, setLocation] = useState<LocationType>({ lat: 0, lng: 0 });
  const [parentFocused, setParentFocused] = useState(false);
  const [aliasLocation, setAliasLocation] = useState<string | null>(null); //장소별칭

  //로그인유저아이디 패치불러오기
  useEffect(() => {
    const checkUser = async () => {
      const user = await fetchUser();
      if (!user) return;
      else setUserId(user);
    };
    checkUser();
  }, []);

  const {
    data: stampList,
    isLoading,
    error: stampListError
  } = useQuery({
    queryKey: ['nowStamp', address?.address_name],
    queryFn: async () => {
      if (address && address.address_name) {
        return await fetchStampList(address.address_name!);
      } else return null;
    },
    enabled: !!userId
  });

  useEffect(() => {
    if (stampList && stampList.length > 0) {
      setVisit(stampList[0].visited);
    }
  }, [stampList]);

  const addAliasLocation = async (alias: string) => {
    const { data, error } = await browserClient
      .from('stamp')
      .update({ aliasLocation: alias })
      .eq('user_id', userId)
      .eq('address', address?.address_name);
    if (error) console.log('error', error);
    return data;
  };

  const AliasAddMutation = useMutation({
    mutationFn: addAliasLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nowStamp'] });
    }
  });

  const onClickAliasAdd = (alias: string) => {
    if (userId) {
      AliasAddMutation.mutate(alias);
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
      setError('주소를 가져오는 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
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
      setError('브라우저가 Geolocation을 지원하지 않습니다.');
    }
  }, []);

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (stampListError)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div className="flex h-[100vh] flex-col px-[24px] py-[36px]">
      {address ? (
        <>
          {/* <p>현재 내 위치 : {address.address_name}</p> */}
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
        <div className="mt-[36px] flex flex-1 flex-col justify-between">
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
                placeholder="간단한 장소나 이름을 적어주세요."
                className="w-full bg-transparent text-[14px] outline-none group-focus-within:text-[#00688A]"
                onChange={(e) => setAliasLocation(e.target.value)}
              />
            </span>
          </div>
          <Link href={'/stamp-all'}>
            <button
              onClick={() => {
                if (aliasLocation !== null) {
                  onClickAliasAdd(aliasLocation);
                }
              }}
              className={`w-full rounded-[12px] bg-secondary-500 py-[21px] font-semiBold text-[20px] text-[#004157] ${visit && 'animate-fadeUpBtn'}`}
            >
              스탬프 확인하러 가기
            </button>
          </Link>
        </div>
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
