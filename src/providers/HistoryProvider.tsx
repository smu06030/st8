'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const HistoryContext = createContext<{
  history: string[];
  pushToHistory: (path: string) => void;
}>({
  history: [],
  pushToHistory: () => {}
});

export const HistoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [history, setHistory] = useState<string[]>([]);
  const pathname = usePathname();

  const pushToHistory = (path: string) => {
    setHistory((prevHistory) => [...prevHistory, path]);
  };

  useEffect(() => {
    if (pathname) {
      pushToHistory(pathname);
    }
  }, [pathname]);

  return <HistoryContext.Provider value={{ history, pushToHistory }}>{children}</HistoryContext.Provider>;
};

export const useHistory = () => useContext(HistoryContext);
