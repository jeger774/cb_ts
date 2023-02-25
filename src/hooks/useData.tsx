import React, { useCallback, useContext, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { INotification, IUseData, ITheme } from '../constants/types';
import { NOTIFICATIONS } from '../constants/mocks';
import { dark } from '../constants';

export const DataContext = React.createContext({});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ITheme>(dark);
  const [notification, setNotification] = useState<INotification>(
    NOTIFICATIONS[0],
  );

  const handleNotification = useCallback(
    (payload: INotification) => {
      if (JSON.stringify(payload) !== JSON.stringify(notification)) {
        setNotification(payload);
      }
    },
    [notification, setNotification],
  );

  const contextValue = {
    theme,
    setTheme,
    notification,
    handleNotification,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext) as IUseData;
