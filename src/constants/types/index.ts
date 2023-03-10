import { ITheme } from './theme';

export * from './components';
export * from './theme';

export interface IAuction {
  id: number;
  title: string;
  quantity: number;
  price: number;
  quality: number;
  image: string;
}

export interface IAuctions {
  createdAt: number;
  minPrice: number;
  medianPrice: number;
  noItems: number;
}

export interface IApiResponse {
  id: number;
  itemId: number;
  buyout: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface IUseData {
  theme: ITheme;
  setTheme: (theme?: ITheme) => void;
}

export interface IRealmData {
  name: string;
  id: number;
}
