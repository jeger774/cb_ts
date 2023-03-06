import React, { useContext, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IUseData, ITheme } from '../constants/types';
import { dark } from '../constants';

export const DataContext = React.createContext({});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ITheme>(dark);

  const contextValue = {
    theme,
    setTheme,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext) as IUseData;
