import { PathType } from '@/types/stampMap/CoordRegionCode.types';
import { StampType } from '@/types/stampMap/Stamp.types';
import { createStore } from 'zustand';

export interface MapPropsType {
  location: { center: { lat: number; lng: number }; isPanto: boolean };
  activeIndex: number;
  selectedPath: PathType;
  filteredStamps: StampType[] | undefined;
}

export interface MapState extends MapPropsType {
  setActiveIndex: (index: number) => void;
  setSelectedPath: (path: PathType) => void;
  setFilteredStamps: (stampList: StampType[] | undefined) => void;
}

export type MapStore = ReturnType<typeof createMapStore>;

// 초기 상태 값
export const initMapState: MapPropsType = {
  location: { center: { lat: 35.90701, lng: 127.570667 }, isPanto: true },
  activeIndex: 0,
  selectedPath: [],
  filteredStamps: []
};

// 스토어 생성
export const createMapStore = (initState: MapPropsType = initMapState) => {
  return createStore<MapState>()((set) => ({
    ...initState,
    setLocation: (location: any) => set((state) => ({ ...state, location: { ...state.location, center: location } })),
    setActiveIndex: (index: number) => set((state) => ({ ...state, activeIndex: index })),
    setSelectedPath: (path: PathType) => set((state) => ({ ...state, selectedPath: path })),
    setFilteredStamps: (stampList: StampType[] | undefined) => set((state) => ({ ...state, filteredStamps: stampList }))
  }));
};
