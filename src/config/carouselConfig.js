// ------------------------------------------
// Carousel Config
// ------------------------------------------

// ------------------------------------------
// The attribute is used as the filter to retreive the results for each carousel
// The attribute uses filter syntax https://www.algolia.com/doc/api-reference/api-parameters/filters/
// The title is used to show above each carousel to indicate what it shows
// ------------------------------------------
export const carouselConfig = [
  {
    attribute: "brand: 'polo ralph lauren'",
    title: 'I am the title of carousel One',
  },
  {
    attribute: "category: 'pullover'",
    title: 'I am the title of carousel Two',
  },
];

// Indicates how many records should be shown in an individual carousel
export const hitsPerCarousel = 8;
