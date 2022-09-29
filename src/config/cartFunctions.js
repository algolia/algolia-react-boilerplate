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

export const productQtyState = atom({
  key: 'productQty',
  default: 0,
});

export const addToCartSelector = selector({
  key: 'addToCartSelector',
  get: ({ get }) => get(cartState),
  set: ({ set, get }, newProduct) => {
    const cart = get(cartState);
    const getProdQty = get(productQtyState);
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
          console.log('first');
          // And
          // If we already have the same article have
          // we store the index of this on cartItemIndex
          cartItemIndex = index;
        }
      });
      if (cartItemIndex !== null) {
        let items = [...cart];
        items[cartItemIndex] = {
          ...items[cartItemIndex],
          qty: getProdQty + 1,
          totalPrice: (getProdQty + 1) * items[cartItemIndex][hitsConfig.price],
        };
        console.log(items);
        // Store in the cart the new array Items
        set(productQtyState[cartItemIndex].qty);
        set(cartState, [items]);
      }
    }
  },
});

// export const addToCartSelector = selector({
//   key: 'addToCartSelector',
// get: ({ get }) => get(order),
// set: ({ set, get }, newArticle) => {
//   set(order, [...get(order), newArticle]);
//   if (cart.length < 1) {
// Store it
// set(cartState, [{ ...product, qty: 1, totalPrice: product[priceForTotal] }]);
// setProductQty(1);
//   }
// },
// set: ({set}, newValue) => set(myAtom, newValue instanceof DefaultValue ? newValue : newValue / 100),
// });

// const addToCart = (product, productQty) => {
//   // If we have not already a Cart
//   if (cart.length < 1) {
//     // Store it
//     setCart([{ ...product, qty: 1, totalPrice: product[priceForTotal] }]);
//     setProductQty(1);
//   } else {
//     // Define a null const
//     let cartItemIndex = null;
//     // Iterate on our cart
//     cart.map((item, index) => {
//       if (item.objectID === product.objectID) {
//         // And
//         // If we already have the same article have
//         // we store the index of this on cartItemIndex
//         cartItemIndex = index;
//       }
//     });
//     if (cartItemIndex !== null) {
//       let items = [...cart];
//       items[cartItemIndex] = {
//         ...items[cartItemIndex],
//         qty: productQty + 1,
//         totalPrice: (productQty + 1) * items[cartItemIndex][priceForTotal],
//       };
//       // Store in the cart the new array Items
//       setProductQty(items[cartItemIndex].qty);
//       setCart(items);
//     } else {
//       // If not already the same article
//       setCart([
//         ...cart,
//         { ...product, qty: 1, totalPrice: product[priceForTotal] },
//       ]);
//       setProductQty(1);
//     }
//   }
// };
