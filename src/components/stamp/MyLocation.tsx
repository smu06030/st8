'use client';

import { useEffect, useState } from 'react';
import StampActive from './StampActive';
import useUserId from '@/hooks/useUserId';
import Link from 'next/link';
import Icon from '@/components/common/Icons/Icon';
import Loading from '@/app/(root)/(stamp)/loading';
import useModal from '@/hooks/useModal';
import AliasCheckModal from '@/components/common/Modal/AliasCheckModal';
import { useGetStampLocationQuery } from '@/queries/query/useStampQuery';
import { usePostAliasMutation } from '@/queries/mutation/useStampMutaion';
import GetUserAddress from '@/components/stamp/GetUserAddress';

const MyLocation = () => {
  const userId = useUserId();
  const [visit, setVisit] = useState<boolean>(false); //방문상태
  const [parentFocused, setParentFocused] = useState(false); //포커스상태
  const [aliasLocation, setAliasLocation] = useState<string | null>(null); //장소별칭
  const { openModal, Modal, isOpen } = useModal(); //모달훅
  const { mutate: postAlias } = usePostAliasMutation();

  const { address, location, error } = GetUserAddress();
  const {
    data: stampList,
    isLoading,
    isError: stampListError
  } = useGetStampLocationQuery(address?.address_name, userId);

  //저장된스탬프의 방문여부 저장
  useEffect(() => {
    if (stampList && stampList.length > 0) {
      setVisit(stampList[0].visited);
    }
  }, [stampList]);

  //스탬프 별명 추가 이벤트
  const onClickAliasAdd = (alias: string) => {
    if (userId) {
      postAlias({ alias, userId, address: address?.address_name ?? '' });
    } else {
      console.error('유저아이디가 없습니다.');
      return;
    }
  };

  // 스탬프 별명있을때 실행
  useEffect(() => {
    if (aliasLocation) {
      onClickAliasAdd(aliasLocation);
    }
  }, [aliasLocation]);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  //스탬프찍힌 위치의 별명 저장
  const saveAlias = stampList?.[0]?.aliasLocation;

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
