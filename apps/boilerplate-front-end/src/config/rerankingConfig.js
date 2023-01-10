import { atom } from 'recoil'

export const activateDRR = atom({
  key: 'activateDRR', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})
