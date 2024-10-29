'use client';
import { MapPropsType, MapState, MapStore, createMapStore } from '@/store/mapStore';
import { createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';

// context 생성
export const MapStoreContext = createContext<MapStore | undefined>(undefined);

export type MapProviderPropsType = React.PropsWithChildren<MapPropsType>;
// provider 생성
export const MapProvider = ({ children, ...props }: MapProviderPropsType) => {
  const storeRef = useRef<MapStore>();

  if (!storeRef.current) {
    storeRef.current = createMapStore(props);
  }

  return <MapStoreContext.Provider value={storeRef.current}>{children}</MapStoreContext.Provider>;
};

// useContext 커스텀 훅 생성
export const useMapStore = <T,>(selector: (store: MapState) => T): T => {
  const mapStoreContext = useContext(MapStoreContext);
  if (!mapStoreContext) {
    throw new Error(`useMapStore는 MapProvider내에서 사용해야 합니다.`);
  }
  return useStore(mapStoreContext, selector);
};
