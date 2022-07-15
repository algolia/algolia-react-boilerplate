// ------------------------------------------
// Carousel Config
// ------------------------------------------
import { atom } from "recoil";
// ------------------------------------------
// The attribute is used as the filter to retreive the results for each carousel
// The attribute uses filter syntax https://www.algolia.com/doc/api-reference/api-parameters/filters/
// The title is used to show above each carousel to indicate what it shows
// ------------------------------------------
export const carouselConfig = [
  {
    context: 'homepage-carousel-one',
    title: 'Our Bags Collection',
  },
  {
    context: 'homepage-carousel-two',
    title: 'Our Best Hoodies',
  },
];

// Indicates how many records should be shown in an individual carousel
export const hitsPerCarousel = 8;


// Please ignore
export const isCarouselLoaded = atom({
  key: 'isCarouselLoaded', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

