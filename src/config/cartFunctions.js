// ------------------------------------------
// Configuration for cart
// Please ignore this configuration
// ------------------------------------------

import { atom, selector } from 'recoil';
import { hitsConfig } from '@/config/hitsConfig';

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

export const order = atom({
  key: 'order',
  default: [],
});

export const addToCartSelector = selector({
  key: 'addToCartSelector',
  get: ({ get }) => get(cartState),
  set: ({ set, get }, newProduct) => {
    const cart = get(cartState);
    // If we have not already a Cart
    if (cart.length < 1) {
      // Store it
      set(cartState, [
        { ...newProduct, qty: 1, totalPrice: newProduct[hitsConfig.price] },
      ]);
    } else {
      // Define a null const
      let cartItemIndex = null;
      // Iterate on our cart
      cart.map((item, index) => {
        if (item.objectID === newProduct.objectID) {
          // And
          // If we already have the same article have
          // we store the index of this on cartItemIndex
          cartItemIndex = index;
        }
      });
      if (cartItemIndex !== null) {
        let items = [...cart];
        const oldQty = items[cartItemIndex];
        items[cartItemIndex] = {
          ...items[cartItemIndex],
          qty: oldQty.qty + 1,
          totalPrice: (oldQty.qty + 1) * items[cartItemIndex][hitsConfig.price],
        };
        // Store in the cart the new array Items
        set(cartState, items);
      } else {
        // If not already the same article
        set(cartState, [
          ...cart,
          { ...newProduct, qty: 1, totalPrice: newProduct[hitsConfig.price] },
        ]);
      }
    }
  },
});

export const removeToCartSelector = selector({
  key: 'removeToCartSelector',
  get: ({ get }) => get(cartState),
  set: ({ set, get }, newProduct) => {
    // Get the Cart from state
    const cart = get(cartState);
    // Define a null const
    let cartItemIndex = null;
    // check if the cart already have the same item
    const cartItem = cart.map((item, index) => {
      if (item.objectID === newProduct.objectID) {
        cartItemIndex = index;
      }
    });
    if (cartItemIndex !== null) {
      // If the product has already been added
      let items = [...cart];
      // Store the old qty to increment the quantity
      const oldQty = items[cartItemIndex];
      if (items[cartItemIndex].qty !== 0) {
        items[cartItemIndex] = {
          ...items[cartItemIndex],
          qty: oldQty.qty - 1,
          totalPrice: (oldQty.qty - 1) * items[cartItemIndex][hitsConfig.price],
        };
        set(cartState, items);
      }
    }
  },
});
