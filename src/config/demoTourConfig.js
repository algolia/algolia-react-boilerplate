import { atom } from 'recoil';

// Should we show the demo tour in this demo
export const shouldShowDemoTour = atom({
  key: 'shouldShowDemoTour',
  default: true,
});