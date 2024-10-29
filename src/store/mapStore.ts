import { PathType } from '@/types/stampMap/CoordRegionCode.types';
import { StampType } from '@/types/stampMap/Stamp.types';
import { createStore } from 'zustand';

export interface MapPropsType {
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
  activeIndex: 0,
  selectedPath: [],
  filteredStamps: []
};

// 스토어 생성
export const createMapStore = (initState: MapPropsType = initMapState) => {
  return createStore<MapState>()((set) => ({
    ...initMapState,
    setActiveIndex: (index: number) => set((state) => ({ ...state, activeIndex: index })),
    setSelectedPath: (path: PathType) => set((state) => ({ ...state, selectedPath: path })),
    setFilteredStamps: (stampList: StampType[] | undefined) => set((state) => ({ ...state, filteredStamps: stampList }))
  }));
};
