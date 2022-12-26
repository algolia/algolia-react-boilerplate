// ------------------------------------------
// Configuration for refinements/facets
// ------------------------------------------
import { atom } from 'recoil'
import { hitsConfig } from './hitsConfig'

// This const defines the refinements to be shown
// There are five possible types: hierarchical, price, colour, size, list
// Generally you should use type list if you are adding a new facet here
export const refinements = [
  {
    type: 'price',
    label: 'Price',
    labelFrench: 'Prix',
    labelGerman: 'Preis',
    options: {
      attribute: hitsConfig.price,
    },
  },
  {
    type: 'hierarchical',
    label: 'Category',
    labelFrench: 'Catégorie',
    labelGerman: 'Kategorie',
    options: {
      attribute: [
        hitsConfig.hierarchicalCategoriesLvl0,
        hitsConfig.hierarchicalCategoriesLvl1,
        hitsConfig.hierarchicalCategoriesLvl2,
        hitsConfig.hierarchicalCategoriesLvl3,
      ],
      searchable: true,
    },
  },
  {
    type: 'list',
    label: 'Brand',
    labelFrench: 'Marque',
    labelGerman: 'Markieren',
    options: {
      attribute: hitsConfig.brand,
      // when searchable is enabled, you can search for a specific value of that facet. Ex: Here you can search for a specific brand
      searchable: true,
      limit: 5,
      // Show more function allow to click on show more button but you have to put a limit
      showMoreFunction: true,
    },
  },
  {
    type: 'colour',
    label: 'Colour',
    labelFrench: 'Couleur',
    labelGerman: 'Farbe',
    options: {
      attribute: hitsConfig.colourHexa,
    },
  },
  {
    type: 'list',
    label: 'Gender',
    labelFrench: 'Genre',
    labelFrench: 'Geschlecht',
    options: {
      attribute: hitsConfig.genderFilter,
    },
  },
  {
    type: 'size',
    label: 'Size',
    labelFrench: 'Taille',
    options: {
      attribute: hitsConfig.sizeFilter,
      limit: 8,
      // Show more function allow to click on show more button but you have to put a limit
      showMoreFunction: false,
    },
  },
]

// This const defines the labels used in price refinements
export const refinementPriceLabels = {
  moreThan: 'More than',
  lessThan: 'Less than',
}

export const refinementsAtom = atom({
  key: 'refinementsAtom', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
})

// State to open facet panel on mobile
export const isFacetPanelOpen = atom({
  key: 'isFacetPanelOpen', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})
