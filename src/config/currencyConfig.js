import { atom } from 'recoil';

export const currency = atom({
  key: 'currencyAtom', // unique ID (with respect to other atoms/selectors)
  default: '£', // default value (aka initial value)
});
