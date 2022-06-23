// ------------------------------------------
// Configuration for the rule widget
// ------------------------------------------
import { atom } from 'recoil';

// Gather rules from Search result state of IS
// Please ignore
export const rulesAtom = atom({
  key: 'rulesAtom', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

// Handle the switch btn state in the demo guide panel
// Please ignore
export const isRulesSwitchToggle = atom({
  key: 'isRulesSwitchToggle', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
