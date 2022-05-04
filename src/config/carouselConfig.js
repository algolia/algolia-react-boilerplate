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
