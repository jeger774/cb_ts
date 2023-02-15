import 'react-native-gesture-handler';
import React from 'react';
import { DataProvider } from './src/hooks';
import AppNavigation from './src/navigation/App';
import { RecoilRoot } from 'recoil';

export default function App() {
  return (
    <RecoilRoot>
      <DataProvider>
        <AppNavigation />
      </DataProvider>
    </RecoilRoot>
  );
}
