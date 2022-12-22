import { atom } from 'recoil'
// Config to customise trending. There are two kinds:
// Trending products: shown on homepage, results page and category pages
// Trending facet values: shown on results pages

export const trendingConfig = {
  // Title for trending products carousel
  productsTitle: 'Trending Products',
  // Attribute on which you've trained trending facet values
  facetValuesAttribute: 'brand',
  // The maximum number of trending products to retrieve/display
  maxProductsRecommendations: 10,
  // The maximum number of trending facet values to retrieve/display
  maxFacetValuesRecommendations: 4,
  // Recommendations confidence score (between 0 and 100). Only recommendations with a greater score are returned.
  threshold: 2,
}

export const mergedItemsTrendingFacets = atom({
  key: 'mergedItemsTrendingFacets', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
})
