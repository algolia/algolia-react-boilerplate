// ------------------------------------------
// Currency Config
// ------------------------------------------

// ------------------------------------------
// This const is used to define the symbol used to display prices
// ------------------------------------------

import { atom } from 'recoil';


export const currencySymbol = '£';


// Change de default currency symbol
// If no need for currency symbol please leave an empty string
export const currencySymbolAtom = atom({
    key: 'currencySymbolAtom', // unique ID (with respect to other atoms/selectors)
    default: '£', // default value (aka initial value)
  });