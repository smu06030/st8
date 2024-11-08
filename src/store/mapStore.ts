import { PathType } from '@/types/stamp/coordRegionCode.type';
import { StampType } from '@/types/stamp/stamp.type';
import { createStore } from 'zustand';

export interface MapPropsType {
  location: { center: { lat: number; lng: number }; isPanto: boolean };
  stampInfo: StampType;
  activeIndex: number;
  selectedPath: PathType;
  filteredStamps: StampType[] | undefined;
}

export interface MapState extends MapPropsType {
  setLocation: (location: any) => void;
  setStampInfo: (stampInfo: StampType) => void;
  setActiveIndex: (index: number) => void;
  setSelectedPath: (path: PathType) => void;
  setFilteredStamps: (stampList: StampType[] | undefined) => void;
}

export type MapStore = ReturnType<typeof createMapStore>;

// 초기 상태 값
export const initMapState: MapPropsType = {
  location: { center: { lat: 35.90701, lng: 127.570667 }, isPanto: true },
  stampInfo: {} as StampType,
  activeIndex: 0,
  selectedPath: [],
  filteredStamps: []
};

// 스토어 생성
export const createMapStore = (initState: MapPropsType = initMapState) => {
  return createStore<MapState>()((set) => ({
    ...initState,
    setLocation: (location: any) => set((state) => ({ ...state, location: { ...state.location, center: location } })),
    setStampInfo: (stampInfo: StampType) => set((state) => ({ ...state, stampInfo })),
    setActiveIndex: (index: number) => set((state) => ({ ...state, activeIndex: index })),
    setSelectedPath: (path: PathType) => set((state) => ({ ...state, selectedPath: path })),
    setFilteredStamps: (stampList: StampType[] | undefined) => set((state) => ({ ...state, filteredStamps: stampList }))
  }));
};
