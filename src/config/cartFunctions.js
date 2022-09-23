// ------------------------------------------
// Configuration for cart
// Please ignore this configuration
// ------------------------------------------

import { atom } from 'recoil';

export const cartState = atom({
  key: 'cartState',
  default: [],
});

export const cartOpen = atom({
  key: 'cartOpen',
  default: false,
});
