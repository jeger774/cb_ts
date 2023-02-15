import { ITheme } from './theme';

export * from './components';
export * from './theme';

export interface IUser {
  name: string;
}

export interface IAuction {
  id: number;
  title: string;
  price: number;
  quality: number;
  user: IUser;
  image?: string;
}

export interface IAuctions {
  createdAt: number;
  minPrice: number;
  medianPrice: number;
  noItems: number;
}

export interface IUseData {
  theme: ITheme;
  setTheme: (theme?: ITheme) => void;
  auctions: IAuction[];
  setAuctions: (data?: IAuction[]) => void;
  notifications: INotification[];
  handleNotifications: (data?: INotification[]) => void;
}

export interface INotification {
  id?: number;
  subject: string;
  message: string;
  createdAt?: number | Date;
}
