// ------------------------------------------
// Configuration for the rule widget
// ------------------------------------------
import { atom } from 'recoil';

// Please ignore
export const rulesAtom = atom({
  key: 'rulesAtom', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
