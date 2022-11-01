// ------------------------------------------
// Configuration for cart
// Please ignore this configuration
// ------------------------------------------

import { atom, selector, useSetRecoilState } from 'recoil'
import { hitsConfig } from '@/config/hitsConfig'

export const currentTotal = atom({
  key: 'currentTotal',
  default: 0,
})

export const cartState = atom({
  key: 'cartState',
  default: [],
})

export const cartOpen = atom({
  key: 'cartOpen',
  default: false,
})

export const removedItem = atom({
  key: 'removedItem',
  default: null,
})

export const cartClick = atom({
  key: 'cartClick',
  default: null,
})

export const clickHamburger = atom({
  key: 'clickHamburger',
  default: null,
})

export const addToCartSelector = selector({
  key: 'addToCartSelector',
  get: ({ get }) => get(cartState),
  set: ({ set, get }, newProduct) => {
    const cart = get(cartState)
    // Check if a there are product in the cart
    if (cart.length < 1) {
      // If no product we're storing a new one into the cart
      set(cartState, [
        { ...newProduct, qty: 1, totalPrice: newProduct[hitsConfig.price] },
      ])
    } else {
      // If already products in cart
      // Check there's the same product as the product we want add... or not.
      let cartItemIndex = null
      cart.map((item, index) => {
        if (item.objectID === newProduct.objectID) {
          // If the product is already in the cart we're storing the index of the product in a variable
          cartItemIndex = index
        }
      })
      // If we've an index matching that means that there is a same product
      // that is matching and that we need to update the quantity of this product in the cart
      if (cartItemIndex !== null) {
        let items = [...cart]
        const oldQty = items[cartItemIndex]
        // Updating quantity of product + the total price
        items[cartItemIndex] = {
          ...items[cartItemIndex],
          qty: oldQty.qty + 1,
          totalPrice: (oldQty.qty + 1) * items[cartItemIndex][hitsConfig.price],
        }
        // Store in the cart the new array of Items
        set(cartState, items)
      } else {
        // If we have a new product that is not already in the cart we're storing this new product in the cart
        set(cartState, [
          ...cart,
          { ...newProduct, qty: 1, totalPrice: newProduct[hitsConfig.price] },
        ])
      }
    }

    set(cartOpen, true)
  },
})

export const removeToCartSelector = selector({
  key: 'removeToCartSelector',
  get: ({ get }) => get(cartState),
  set: ({ set, get }, newProduct) => {
    // Get the Cart from state
    const cart = get(cartState)
    // If we've an index matching that means that there is already have same product
    //  and we need to update the quantity of this product in the cart
    let cartItemIndex = null
    cart.map((item, index) => {
      if (item.objectID === newProduct.objectID) {
        cartItemIndex = index
      }
    })
    if (cartItemIndex !== null) {
      // Check if the product is in the cart and decrease the quantity
      let items = [...cart]
      const oldQty = items[cartItemIndex]

      if (items[cartItemIndex].qty !== 0) {
        items[cartItemIndex] = {
          ...items[cartItemIndex],
          qty: oldQty.qty - 1,
          totalPrice: (oldQty.qty - 1) * items[cartItemIndex][hitsConfig.price],
        }
        set(openCart, !openCart)
      }
    }
  },
})
