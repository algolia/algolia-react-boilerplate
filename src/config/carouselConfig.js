// ------------------------------------------
// Carousel Config
// ------------------------------------------

import { atom } from 'recoil';

export const isCarouselAtom = atom({
  key: 'isCarouselAtom', // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
});

// What error is presented if this is wrong or empty
// If you don't want carousels, do not adjust this, just change isCarouselAtom to false
// attribute uses filter syntax https://www.algolia.com/doc/api-reference/api-parameters/filters/
export const carouselConfig = [
  {
    attribute: "brand:'polo ralph lauren'",
    title: 'Ralph Lauren Products',
  },
  {
    attribute: "category:'pullover'",
    title: 'Our PullOver',
  },
];
