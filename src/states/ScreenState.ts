import { atom } from 'recoil';

export const activeScreen = atom({
  key: 'screenState',
  default: 'Auctions',
});
