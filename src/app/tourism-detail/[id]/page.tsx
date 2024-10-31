'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaBookmark } from 'react-icons/fa';
import browserClient from '../../../utils/supabase/client';

const PlaceDetail = ({ params }) => {
  const { id } = params;

  const [firstImage, setFirstImage] = useState(null);
  const [titleText, setTitleText] = useState('');
  const [overview, setOverview] = useState('');
  const [openDate, setOpenDate] = useState('');
  const [restDate, setRestDate] = useState('');
  const [parking, setParking] = useState('');
  const [babyCarriage, setBabyCarriage] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [mapX, setMapX] = useState(null);
  const [mapY, setMapY] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const { data, error } = await browserClient.from('tourlist').select('text').eq('contentid', id).single();

        if (error) throw error;

        setTitleText(data.text || '제목을 불러올 수 없습니다');

        const OPEN_KEY = process.env.NEXT_PUBLIC_TOUR_API_KEY;
        const response = await fetch(
          `https://apis.data.go.kr/B551011/KorService1/detailCommon1?MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${id}&contentTypeId=12&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&numOfRows=50&pageNo=1&serviceKey=${OPEN_KEY}`
        );

        const apiData = await response.json();
        const item = apiData.response.body.items.item[0] || {};

        setFirstImage(item.firstimage || '/placeholder.png');
        setOverview(item.overview || '상세 설명을 불러올 수 없습니다');
        setMapX(item.mapx || null);
        setMapY(item.mapy || null);

        // Fetching additional details (opendate, restdate, parking, baby carriage, credit card availability)
        const introResponse = await fetch(
          `https://apis.data.go.kr/B551011/KorService1/detailIntro1?MobileOS=ETC&MobileApp=모아&_type=json&contentId=${id}&contentTypeId=12&serviceKey=${OPEN_KEY}`
        );
        const introData = await introResponse.json();
        const introItem = introData.response.body.items.item[0] || {};

        setOpenDate(introItem.opendate || '');
        setRestDate(introItem.restdate || '');
        setParking((introItem.parking || '').replace(/<br>/g, ' '));
        setBabyCarriage(introItem.chkbabycarriage || '');
        setCreditCard(introItem.chkcreditcard || '');
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (mapX && mapY) {
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services`;
      script.async = true;
      script.onload = () => {
        const kakao = window.kakao;
        const container = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(mapY, mapX),
          level: 3
        };
        const map = new kakao.maps.Map(container, options);
      };
      document.head.appendChild(script);
    }
  }, [mapX, mapY]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* 상단 이미지 */}
      <div className="relative h-60 w-full overflow-hidden rounded-b-lg bg-gray-300">
        {!loading && firstImage ? (
          <Image src={firstImage} alt="장소 사진" layout="fill" objectFit="cover" />
        ) : (
          <p>Loading...</p>
        )}
        <button className="shadow-md absolute bottom-2 right-2 z-10 rounded-full bg-white p-2">
          <FaBookmark size={16} className="text-gray-600" />
        </button>
      </div>

      {/* 제목 및 설명 */}
      <div className="mt-4 px-4">
        <h1 className="font-bold text-2xl text-gray-800">{titleText}</h1>
      </div>

      {/* 상세 정보 및 더보기 버튼 */}
      <div className="mt-4 px-4">
        <p className="text-sm text-gray-700">{overview}</p>
      </div>

      {/* 개장일 및 휴무일 정보 */}
      {(openDate || restDate) && (
        <div className="mt-4 px-4">
          <h2 className="text-lg font-semibold text-gray-800">개장일 및 휴무일 정보</h2>
          {openDate && <p className="mt-1 text-sm text-gray-500">개장일: {openDate}</p>}
          {restDate && <p className="mt-1 text-sm text-gray-500">휴무일: {restDate}</p>}
        </div>
      )}

      {/* 추가 정보 (주차, 유모차 대여, 신용카드 가능 여부) */}
      {(parking || babyCarriage || creditCard) && (
        <div className="mt-4 px-4">
          <h2 className="text-lg font-semibold text-gray-800">추가 정보</h2>
          {parking && <p className="mt-1 text-sm text-gray-500">주차시설: {parking}</p>}
          {babyCarriage && <p className="mt-1 text-sm text-gray-500">유모차 대여: {babyCarriage}</p>}
          {creditCard && <p className="mt-1 text-sm text-gray-500">신용카드 사용 여부: {creditCard}</p>}
        </div>
      )}

      {/* 위치 섹션 */}
      <div className="mt-8 px-4">
        <h2 className="text-lg font-semibold text-gray-800">위치</h2>
        <div id="map" className="relative mt-4 h-60 w-full rounded-lg bg-gray-300"></div>
      </div>
    </div>
  );
};

export default PlaceDetail;
