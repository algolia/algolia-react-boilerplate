import { atom } from 'recoil';

// Should we show the demo tour in this demo
export const shouldShowDemoTour = atom({
  key: 'shouldShowDemoTour',
  default: false,
});

// Steps for the demo tour, these are adjustable
export const steps = [
  {
    selector: '.searchbox-container',
    content:
      'This is the searchbox. It will open a federated search on click. It will open a search results page if you press the return key',
  },
  {
    selector: '.ais-VoiceSearch',
    content: 'This is VoiceSearch - search by saying something',
  },
  {
    selector: '.container__header-nav__links ',
    content:
      'This is the Navigation section. There are the Categories, Personas and Segments, all customisable!',
  },
  {
    selector: '.container__header-nav-selectors',
    content:
      'Changing the persona or segment will show you how we create unique, AI-powered search experiences',
  },
  {
    selector: '.optionDots__wrapper',
    content:
      'We made a helpful Guide Panel to show some of the awesome features in this demo!',
  },
];
