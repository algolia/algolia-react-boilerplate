import { atom } from 'recoil';

// Is the helped navigation should be in the app
export const shouldShowDemoGuide = atom({
    key: 'shouldShowDemoGuide', // unique ID (with respect to other atoms/selectors)
    default: true, // default value (aka initial value)
  });

// Is the helped navigation menu should be shown because the button has been clicked
export const isDemoGuideOpen = atom({
key: 'isDemoGuideOpen', // unique ID (with respect to other atoms/selectors)
default: false, // default value (aka initial value)
});