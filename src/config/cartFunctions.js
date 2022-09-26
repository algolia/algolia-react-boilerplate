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

export const removedItem = atom({
  key: 'removedItem',
  default: null,
});

export const cartClick = atom({
  key: 'cartClick',
  default: null,
});

export const clickHamburger = atom({
  key: 'clickHamburger',
  default: null,
});
