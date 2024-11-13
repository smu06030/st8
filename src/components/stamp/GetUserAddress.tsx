'use client';

import { useEffect, useState } from 'react';
import { showErrorMsg } from '@/components/stamp/LocationErrorMsg';
import { AddressType } from '@/types/stamp/addressProps.type';

interface LocationType {
  lat: number;
  lng: number;
}

const GetUserAddress = () => {
  const [address, setAddress] = useState<AddressType>(); //현재주소
  const [location, setLocation] = useState<LocationType>({ lat: 0, lng: 0 });
  const [error, setError] = useState<string | null>(null); //에러상태

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
    const checkGeolocation = async () => {
      if ('permissions' in navigator) {
        //현 브라우저가 Geolocation API를 지원하는지 확인
        try {
          const result = await navigator.permissions.query({ name: 'geolocation' }); //사용자의 위치정보에 대한 권한을 요청
          if (result.state === 'granted' || result.state === 'prompt') {
            //허용했을때, 처음위치권한요청시
            navigator.geolocation.getCurrentPosition(
              //사용자의 현재 위치를 요청
              async (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ lat: latitude, lng: longitude });
                await getAddress(latitude, longitude);
              },
              (err) => {
                showErrorMsg(err.message, setError);
                alert('위치 권한이 거부되었습니다. 허용하지 않으면 스탬프를 찍을 수 없습니다.');
              },
              {
                enableHighAccuracy: true, // 정확도 우선 모드
                timeout: 60000, // 1분 이내에 응답 없으면 에러 발생
                maximumAge: 0 // 항상 최신 위치 정보 수집
              }
            );
          } else if (result.state === 'denied') {
            // 위치 권한이 거부된 경우
            alert('위치 권한이 거부되었습니다. 허용하지 않으면 스탬프를 찍을 수 없습니다.');
            showErrorMsg('위치 권한이 거부되었습니다.', setError);
          }
        } catch (error) {
          console.log('권한을 확인하는 중 오류가 발생했습니다.', error);
        }
      } else {
        console.log('Geolocation API를 지원하지 않는 브라우저입니다.');
      }
    };
    checkGeolocation();
  }, []);

  return {
    address,
    location,
    error
  };
};

export default GetUserAddress;
