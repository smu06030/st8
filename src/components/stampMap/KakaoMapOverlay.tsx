import { useMapStore } from '@/providers/mapStoreProvider';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import MarketPin from '../../../public/images/marker-pin-01.svg';

interface KakaoMapOverlayPropsType {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const KakaoMapOverlay = ({ setIsOpen }: KakaoMapOverlayPropsType) => {
  const stamp = useMapStore((state) => state.stampInfo);
  // const date = new Date(stamp.created_at).toISOString().replace('T', ' ').substring(0, 19).replace(/-/g, '/');
  return (
    <CustomOverlayMap position={{ lat: stamp.lat, lng: stamp.lng }} yAnchor={1.12} zIndex={10}>
      <div className="flex h-[300px] w-[250px] cursor-pointer flex-col items-baseline justify-between rounded-md bg-white pt-3 shadow-overlayShadow">
        <div className="flex w-full flex-row items-center justify-end pl-4 pr-3 text-xs">
          <div className="inline-flex h-7 w-7 items-center justify-center bg-white p-1">
            <div
              className="relative flex h-5 w-5 flex-col items-start justify-start"
              onClick={() => setIsOpen(false)}
              title="닫기"
            >
              <MarketPin />
            </div>
          </div>
        </div>
        <div className="mb-4 flex w-full items-center justify-center px-4 text-lg">
          <span className="flex h-[100px] w-[100px]">
            <img src={stamp.stampimg} alt={stamp.region} />
          </span>
        </div>
        <div className="flex w-full flex-row items-center justify-between px-4 text-xs">
          <div>
            <div>{stamp.region}</div>
            <div>{stamp.address}</div>
            <div className="mt-1 text-[#3D75CC] decoration-1 underline-offset-1 hover:underline hover:decoration-gray-400">
              찍은 일시: 일자
            </div>
            <div className="mt-1 flex w-full flex-row justify-between">위도: {stamp.lat}</div>
            <div className="mt-1 flex">경도: {stamp.lng}</div>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            // navigate(`/detail/${stamp.contentId}`);
          }}
          className="mt-4 h-[48px] w-full rounded-b-md bg-primary-400 text-white hover:bg-[#ffd447]"
        >
          앨범보기
        </button>
      </div>
    </CustomOverlayMap>
  );
};

export default KakaoMapOverlay;
