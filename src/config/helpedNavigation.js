import { atom } from 'recoil';

// Is the helped navigation should be in the app
export const shouldShowHelpedNavigation = atom({
    key: 'shouldShowHelpedNavigation', // unique ID (with respect to other atoms/selectors)
    default: true, // default value (aka initial value)
  });

// Is the helped navigation menu should be shown because the button has been clicked
export const isHelpedNavigation = atom({
key: 'isHelpedNavigation', // unique ID (with respect to other atoms/selectors)
default: false, // default value (aka initial value)
});