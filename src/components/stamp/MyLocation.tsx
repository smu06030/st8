'use client';

import { useEffect, useState } from 'react';
import StampActive from './StampActive';
import { AddressPropsType } from '@/types/stamp/AddressPropsType';

const MyLocation = () => {
  // const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null); //위치상태
  const [error, setError] = useState<string | null>(null); //에러상태
  const [address, setAddress] = useState<AddressPropsType | null>(null); //현재주소

  const getAddress = async (lat: number, lng: number) => {
    //주소가져오는함수
    try {
      //https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}
      //주소 데이터를 요청
      const res = await fetch(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`, {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`
        }
      });
      const data = await res.json();
      console.log('data', data);
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

  //가져오기 실패했을때 상황에 따른 에러메세지(추후 분리)
  const showErrorMsg = (error: GeolocationPositionError | null | string) => {
    if (error instanceof GeolocationPositionError) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          setError('Geolocation API의 사용 요청을 거부했습니다.');
          break;
        case error.POSITION_UNAVAILABLE:
          setError('위치 정보를 사용할 수 없습니다.');
          break;
        case error.TIMEOUT:
          setError('위치 정보를 가져오기 위한 요청이 허용 시간을 초과했을습니다.');
          break;
        default:
          setError('알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.');
          break;
      }
    } else if (typeof error === 'string') {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      //현 브라우저가 Geolocation API를 지원하는지 확인
      navigator.geolocation.getCurrentPosition(
        //사용자의 현재 위치를 요청
        async (position) => {
          const { latitude, longitude } = position.coords;
          // setLocation({ lat: latitude, lng: longitude });
          await getAddress(latitude, longitude); //위도경도 인자로 넘기기
        },
        (err) => {
          showErrorMsg(err.message);
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

  return (
    <>
      <h1>내 위치</h1>
      {address ? (
        <>
          <p>현재 내 위치 : {address.address_name}</p>
          <StampActive address={address} />
        </>
      ) : (
        <p>{error ? `Error: ${error}` : '위치를 가져오고있습니다...'}</p>
      )}
    </>
  );
};

export default MyLocation;

/**
 * 추후지울예정
Geolocation API는 CSR에서만 작동할 수 있다.
Geolocation API는 비동기적으로 동작한다.
처음리랜더링됬을때 작동하게하고, 항상 최신 위치정보를 수집하게한다.
1분이내로 카운트 ㄱㄱ
깃허브안올라가게 .env.local (주의!!!)
 */
