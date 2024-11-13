'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/common/Icons/Icon';
import { useBookmarkMutation } from '@/queries/mutation/useBookmarkMutation';
import { useRouter } from 'next/navigation';

import '@/styles/mainTourismSwiper.css';

interface MainTourismCardPropsType {
  userId: string | undefined;
  firstimage: string | null;
  description: string;
  contentId: string;
  title: string;
  isBookmarked: boolean;
  activeIndex?: number;
  index?: number;
}

const MainTourismCard = ({
  userId,
  firstimage,
  description,
  contentId,
  title,
  isBookmarked: initialBookmarked, // 초기 북마크 상태로 설정
  activeIndex,
  index
}: MainTourismCardPropsType) => {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState<boolean>(initialBookmarked);
  const { mutate: bookmarkMutate } = useBookmarkMutation();

  // 북마크 추가 또는 해제 함수
  const onClickBookmark = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (!userId) {
      alert('로그인이 필요한 서비스 입니다.');
      router.push('/login');
      return;
    }

    try {
      bookmarkMutate({ contentId, userId, isBookmarked, title, description });
      setIsBookmarked(!isBookmarked);
      console.log(`북마크 ${isBookmarked ? '해제' : '추가'} 성공`);
    } catch (error) {
      console.error('북마크 업데이트 중 오류:', error);
      alert('북마크 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div
      className={`${activeIndex === index ? 'swiper-slide-active' : ''} relative h-[374px] w-auto overflow-hidden rounded-3xl bg-[#1d1d1d]/70 lg:h-[290px] lg:w-auto lg:shrink-0`}
    >
      <Link href={`/tourism/${contentId}`}>
        <Image
          src={firstimage ? firstimage : '/placeholder.png'}
          alt={description || '이미지 설명 없음'}
          fill
          priority
          sizes="(min-width: 640px) 70vw, 50vw"
          style={{ objectFit: 'cover' }}
        />
        <div className="absolute inset-0 rounded-3xl bg-[#1d1d1d]/70"></div>
      </Link>
      <button
        onClick={onClickBookmark}
        className={`absolute right-[18px] top-5 z-20 flex h-14 w-14 items-center justify-center rounded-full ${isBookmarked ? 'text-yellow-500' : 'text-gray-500'} bg-[#4e4e4e]/60`}
      >
        <Icon name="BookMarkIcon2" size={64} color={isBookmarked ? '#FFD700' : 'white'} />
      </button>
      <div className="absolute bottom-[42px] left-[36px] right-[36px] flex flex-col justify-end text-left text-white">
        <Link href={`/tourism/${contentId}`}>
          <p className="ellipsis-multiline break-keep font-semiBold text-[24px] leading-[31.20px]">{description}</p>
        </Link>
      </div>
    </div>
  );
};

export default MainTourismCard;
