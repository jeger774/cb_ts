import { ITheme } from './theme';

export * from './components';
export * from './theme';

export interface IAuction {
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
  notification: INotification[];
  handleNotification: (data?: INotification[]) => void;
}

export interface INotification {
  id: number;
  subject: string;
  message: string;
  //createdAt?: Date;
}