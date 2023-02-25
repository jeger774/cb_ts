/* eslint-disable @typescript-eslint/no-unused-vars */
import dayjs from 'dayjs';
import { INotification } from './types';

// notifications
export const NOTIFICATIONS: INotification[] = [
  {
    id: 1,
    subject: 'Wishlist update',
    message: 'An item on your wishlist has reached your selected price.',
    //createdAt: dayjs().subtract(2, 'h').toDate(),
  },
  {
    id: 2,
    subject: 'Wishlist update',
    message: 'An item on your wishlist has reached your selected price.',
    //createdAt: dayjs().subtract(4, 'h').toDate(),
  },
  {
    id: 3,
    subject: 'Wishlist update',
    message: 'An item on your wishlist has reached your selected price.',
    //createdAt: dayjs().subtract(6, 'h').toDate(),
  },
];

export default {
  NOTIFICATIONS,
};
