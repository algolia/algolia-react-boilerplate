import { atom } from 'recoil'

// Please ignore this atom
export const showRedirectModal = atom({
  key: 'showRedirectModal', // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
})
