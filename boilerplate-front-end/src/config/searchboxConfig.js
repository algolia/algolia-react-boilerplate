// ------------------------------------------
// Configuration for searchbox
// ------------------------------------------
import { atom } from 'recoil'

// This const defines whether "Searching in [CATEGORY]" is shown in the searchbox when on a category page
export const isSearchInCategory = true

// Please ignore this atom
export const localSearchQueryAtom = atom({
  key: 'localSearchQueryAtom', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
})

// Please ignore this atom
export const searchBoxAtom = atom({
  key: 'searchBoxAtom', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
})
// Please ignore this atom
export const searchBoxIsActive = atom({
  key: 'searchBoxIsActive', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})
