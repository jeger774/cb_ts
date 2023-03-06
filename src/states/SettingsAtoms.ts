import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const customStorage = () => {
  return {
    async setItem(key: string, value: string) {
      try {
        await AsyncStorage.setItem(key, value);
      } catch (error) {
        console.error('Error saving data:', error);
      }
    },
    async getItem(key: string) {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          return value;
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    },
  };
};

//@ts-ignore
const { persistAtom } = recoilPersist({ storage: customStorage() });

export const regionState = atom({
  key: 'regionState',
  default: 'EU',
  effects_UNSTABLE: [persistAtom],
});

export const realmState = atom({
  key: 'realmState',
  default: 'Thekal',
  effects_UNSTABLE: [persistAtom],
});

export const factionState = atom({
  key: 'factionState',
  default: 'Alliance',
  effects_UNSTABLE: [persistAtom],
});
