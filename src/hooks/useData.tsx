import React, { useCallback, useContext, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IAuction, IUser, IUseData, ITheme } from '../constants/types';

import { USERS, AUCTIONS } from '../constants/mocks';

import { dark } from '../constants';

export const DataContext = React.createContext({});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ITheme>(dark);
  const [user, setUser] = useState<IUser>(USERS[0]);
  const [users, setUsers] = useState<IUser[]>(USERS);
  const [auctions, setAuctions] = useState<IAuction[]>(AUCTIONS);
  const [auction, setAuction] = useState<IAuction>();

  // handle users / profiles
  const handleUsers = useCallback(
    (payload: IUser[]) => {
      // set users / compare if has updated
      if (JSON.stringify(payload) !== JSON.stringify(users)) {
        setUsers({ ...users, ...payload });
      }
    },
    [users, setUsers],
  );

  // handle user
  const handleUser = useCallback(
    (payload: IUser) => {
      // set user / compare if has updated
      if (JSON.stringify(payload) !== JSON.stringify(user)) {
        setUser(payload);
      }
    },
    [user, setUser],
  );

  // handle Auction
  const handleAuction = useCallback(
    (payload: IAuction) => {
      // set auction / compare if updated
      if (JSON.stringify(payload) !== JSON.stringify(auction)) {
        setAuction(payload);
      }
    },
    [auction, setAuction],
  );

  const contextValue = {
    theme,
    setTheme,
    user,
    handleUser,
    users,
    handleUsers,
    auctions,
    setAuctions,
    auction,
    handleAuction,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext) as IUseData;
