// ------------------------------------------
// Currency Config
// ------------------------------------------

// ------------------------------------------
// This const is used to define the symbol used to display prices
// ------------------------------------------

import { atom } from 'recoil';

// Change de default currency symbol
// If no need for currency symbol please leave an empty string
export const currencySymbolAtom = atom({
  key: 'currencySymbolAtom', // unique ID (with respect to other atoms/selectors)
  default: '£', // default value (aka initial value)
});

// ------------------------------------------
// Should I have to display a currency
// If it's already present into hits put the attribute at false
// To don't have a repetition of currency
// ------------------------------------------

export const shouldIdisplayCurrency = atom({
  key: 'shouldIdisplayCurrency',
  default: false,
});
