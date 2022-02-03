import { atom } from 'recoil'

export const placeholderAtom = atom({
  key: 'placeholderAtom', // unique ID (with respect to other atoms/selectors)
  default: 'Search', // default value (aka initial value)
})

export const queryAtom = atom({
  key: 'queryAtom', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
})
