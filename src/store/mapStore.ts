import { Stamp } from '@/types/supabase/table.type';
import { PathType } from '@/types/stamp/coordRegionCode.type';
import { createStore } from 'zustand';

export interface MapPropsType {
  location: { center: { lat: number; lng: number }; isPanto: boolean; level: number };
  stampInfo: Stamp;
  activeIndex: number;
  selectedPath: PathType;
  filteredStamps: Stamp[] | undefined;
}

export interface MapState extends MapPropsType {
  setLocation: (location: any, level: number) => void;
  setStampInfo: (stampInfo: Stamp) => void;
  setActiveIndex: (index: number) => void;
  setSelectedPath: (path: PathType) => void;
  setLocationLevel: (level: number) => void;
  setFilteredStamps: (stampList: Stamp[] | undefined) => void;
}

export type MapStore = ReturnType<typeof createMapStore>;

// 초기 상태 값
export const initMapState: MapPropsType = {
  location: { center: { lat: 35.90701, lng: 127.570667 }, isPanto: true, level: 13 },
  stampInfo: {} as Stamp,
  activeIndex: 0,
  selectedPath: [],
  filteredStamps: []
};

// 스토어 생성
export const createMapStore = (initState: MapPropsType = initMapState) => {
  return createStore<MapState>()((set) => ({
    ...initState,
    setLocation: (location: any, level: number) =>
      set((state) => ({ ...state, location: { ...state.location, center: location, level: level } })),
    setStampInfo: (stampInfo: Stamp) => set((state) => ({ ...state, stampInfo })),
    setActiveIndex: (index: number) => set((state) => ({ ...state, activeIndex: index })),
    setSelectedPath: (path: PathType) => set((state) => ({ ...state, selectedPath: path })),
    setLocationLevel: (level: number) => set((state) => ({ ...state, location: { ...state.location, level: level } })),
    setFilteredStamps: (stampList: Stamp[] | undefined) => set((state) => ({ ...state, filteredStamps: stampList }))
  }));
};
