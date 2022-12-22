import { atom } from 'recoil'

export const openQR = atom({
  key: 'openQR', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})
