// ------------------------------------------
// Carousel Config
// ------------------------------------------
import { atom } from 'recoil'
// ------------------------------------------
// The attribute is used as the filter to retreive the results for each carousel
// The attribute uses filter syntax https://www.algolia.com/doc/api-reference/api-parameters/filters/
// The title is used to show above each carousel to indicate what it shows
// ------------------------------------------
//If you use translation please write your title in different language and respect the
// title+language combination

// Please use Translation for Carousels Title
export const carouselConfig = [
  {
    context: 'homepage-carousel-one',
  },
  {
    context: 'homepage-carousel-two',
  },
]

// Indicates how many records should be shown in an individual carousel
export const hitsPerCarousel = 8

// Please ignore
export const isCarouselLoaded = atom({
  key: 'isCarouselLoaded', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})
