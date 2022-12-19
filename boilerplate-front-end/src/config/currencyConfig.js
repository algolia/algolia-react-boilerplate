// ------------------------------------------
// Currency Config
// ------------------------------------------
import { atom } from 'recoil'

// Change the default currency symbol
// If no need for currency symbol please leave an empty string
export const currencySymbolAtom = atom({
  key: 'currencySymbolAtom', // unique ID (with respect to other atoms/selectors)
  default: '£', // default value (aka initial value)
})

// ------------------------------------------
// Should the app display a currency symbol
// If it's already present in your price data, make the attribute false
// ------------------------------------------
export const shouldDisplayCurrency = atom({
  key: 'shouldDisplayCurrency',
  default: true,
})
