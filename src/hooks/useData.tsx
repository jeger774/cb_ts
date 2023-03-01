import React, { useCallback, useContext, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { INotification, IUseData, ITheme } from '../constants/types';
import { NOTIFICATIONS } from '../constants/mocks';
import { dark } from '../constants';

export const DataContext = React.createContext({});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ITheme>(dark);
  const [notifications, setNotifications] =
    useState<INotification[]>(NOTIFICATIONS);
  const [notification, setNotification] = useState<INotification>();

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
    notifications,
    setNotifications,
    notification,
    handleNotification,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext) as IUseData;
