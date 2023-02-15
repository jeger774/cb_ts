/* eslint-disable @typescript-eslint/no-unused-vars */
import dayjs from 'dayjs';
import { IAuction, INotification, IUser } from './types';

// users
export const USERS: IUser[] = [
  {
    name: 'Alysha',
  },
  {
    name: 'Lyrander',
  },
  {
    name: 'Krennis',
  },
  {
    name: 'Kragoth',
  },
  {
    name: 'Elandra',
  },
  {
    name: 'Glabur',
  },
  {
    name: 'Wraywen',
  },
  {
    name: 'Tandil',
  },
];

// auctions
export const AUCTIONS: IAuction[] = [
  {
    id: 1,
    title: 'Potion of Speed',
    price: 7,
    quality: 1,
    user: USERS[0],
    image:
      'https://wow.zamimg.com/images/wow/icons/large/inv_alchemy_elixir_04.jpg',
  },
  {
    id: 2,
    title: 'Potion of Wild Magic',
    price: 8,
    quality: 1,
    user: USERS[1],
    image:
      'https://wow.zamimg.com/images/wow/icons/large/inv_alchemy_elixir_01.jpg',
  },
  {
    id: 3,
    title: 'Runed Copper Gauntlets',
    price: 3,
    quality: 2,
    user: USERS[7],
    image: 'https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg',
  },
  {
    id: 4,
    title: 'Combustion Bracers',
    price: 3490,
    quality: 4,
    user: USERS[2],
    image: 'https://wow.zamimg.com/images/wow/icons/large/inv_bracer_25a.jpg',
  },
  {
    id: 5,
    title: 'Indestructible Potion',
    price: 22,
    quality: 1,
    user: USERS[3],
    image:
      'https://wow.zamimg.com/images/wow/icons/large/inv_alchemy_elixir_empty.jpg',
  },
  {
    id: 7,
    title: 'Runed Orb',
    price: 2000,
    quality: 3,
    user: USERS[4],
    image:
      'https://wow.zamimg.com/images/wow/icons/large/inv_misc_runedorb_01.jpg',
  },
  {
    id: 8,
    title: 'Darkmoon Card: Greatness',
    price: 13000,
    quality: 4,
    user: USERS[5],
    image:
      'https://wow.zamimg.com/images/wow/icons/large/inv_inscription_tarotgreatness.jpg',
  },
  {
    id: 9,
    title: 'Nobles Deck',
    price: 8450,
    quality: 4,
    user: USERS[6],
    image:
      'https://wow.zamimg.com/images/wow/icons/large/inv_misc_ticket_tarot_stack_01.jpg',
  },
  {
    id: 10,
    title: 'Thick Fur Clothing Scraps',
    price: 1,
    quality: 0,
    user: USERS[2],
    image:
      'https://wow.zamimg.com/images/wow/icons/large/inv_misc_pelt_arctic_02.jpg',
  },
];

// notifications
export const NOTIFICATIONS: INotification[] = [
  {
    id: 1,
    subject: 'Wishlist update',
    message: 'An item on your wishlist has reached your selected price.',
    createdAt: dayjs().subtract(2, 'h').toDate(),
  },
  {
    id: 2,
    subject: 'Wishlist update',
    message: 'An item on your wishlist has reached your selected price.',
    createdAt: dayjs().subtract(4, 'h').toDate(),
  },
  {
    id: 3,
    subject: 'Wishlist update',
    message: 'An item on your wishlist has reached your selected price.',
    createdAt: dayjs().subtract(6, 'h').toDate(),
  },
];

export default {
  USERS,
  AUCTIONS,
  NOTIFICATIONS,
};
