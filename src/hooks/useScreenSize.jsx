import { atom } from 'recoil'

// This is for defining the size of the window, for responsive design
export const windowSize = atom({
  key: 'windowSize', // unique ID (with respect to other atoms/selectors)
  default: {
    laptop: undefined,
    laptopXS: undefined,
    tablet: undefined,
    mobile: undefined,
    isDesktop: undefined,
  }, // default value (aka initial value)
})
