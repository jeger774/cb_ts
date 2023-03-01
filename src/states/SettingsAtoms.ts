import { atom } from 'recoil';

export const regionState = atom({
  key: 'regionState',
  default: 'EU',
});

export const realmState = atom({
  key: 'realmState',
  default: 'Thekal',
});

export const factionState = atom({
  key: 'factionState',
  default: 'Alliance',
});
