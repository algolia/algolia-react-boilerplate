import { atom } from 'recoil';

export const hitsAtom = atom({
  key: 'hitsAtom', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const hitAtom = atom({
  key: 'hitAtom', // unique ID (with respect to other atoms/selectors)
  default: {}, // default value (aka initial value)
});
