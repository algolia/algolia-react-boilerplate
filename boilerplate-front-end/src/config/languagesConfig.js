// ------------------------------------------
// Configuration for languages switch across the application
// NB this isn't functional on the flagship index as we only have one language
// ------------------------------------------
import { atom } from 'recoil'

// Define what values are going to be displayed in the language selector
export const languagesConfig = [
  {
    value: 'English',
    label: 'English',
    code: 'EN',
    type: 'language',
  },
  {
    value: 'German',
    label: 'German',
    code: 'GER',
    type: 'language',
  },
  {
    value: 'French',
    label: 'French',
    code: 'FR',
    type: 'language',
  },
  {
    value: 'Italian',
    label: 'Italian',
    code: 'IT',
    type: 'language',
  },
]

// Define index by languages & currency.
// Change if necessary
export const languageSwitchConfig = {
  EN: {
    index: 'flagship_fashion',
    currency: '£',
    linksHeader: [
      {
        name: 'All',
        type: 'filter',
        filter: '',
        url: '/search',
      },
      {
        name: 'Mens',
        type: 'filter',
        filter: 'Mens',
        url: '/mens',
      },
      {
        name: 'Womens',
        type: 'filter',
        filter: 'Womens',
        url: '/womens',
      },
      // For an uilisation of your own made filter
      {
        name: 'Womens accessories by Even & Odd',
        type: 'rawFilter',
        filter: '',
        rawFilter:
          "hierarchicalCategories.lvl0:'Womens' AND hierarchicalCategories.lvl1:'Womens > Accessories' AND brand:'even&odd'",
      },
      // This uses context from the Algolia dashboard, configured using Visual Editor
      {
        name: 'Accessories',
        type: 'context',
        context: 'accessories',
      },
    ],
  },
  IT: {
    index: 'off_white_custom_demo_italian',
    currency: '€',
    linksHeader: [
      {
        name: 'Tutto',
        type: 'filter',
        filter: '',
        url: '/search',
      },
      {
        name: 'Uomo',
        type: 'filter',
        filter: 'Mens',
        url: '/Uomo',
      },
      {
        name: 'Donna',
        type: 'filter',
        filter: 'Womens',
        url: '/Donna',
      },
      {
        name: 'Accessori da donna di Even & Odd',
        type: 'rawFilter',
        filter: '',
        rawFilter:
          "hierarchicalCategories.lvl0:'Womens' AND hierarchicalCategories.lvl1:'Womens > Accessories' AND brand:'even&odd'",
      },
      {
        name: 'Accessori',
        type: 'context',
        context: 'accessories',
      },
    ],
  },
  FR: {
    index: 'flagship_fashion',
    currency: '€',
    linksHeader: [
      {
        name: 'Tous',
        type: 'filter',
        filter: '',
        url: '/search',
      },
      {
        name: 'Hommes',
        type: 'filter',
        filter: 'Mens',
        url: '/hommes',
      },
      {
        name: 'Femmes',
        type: 'filter',
        filter: 'Womens',
        url: '/femmes',
      },
      // For an uilisation of your own made filter
      {
        name: 'Femmes et Accessoires by Even & Odd',
        type: 'rawFilter',
        filter: '',
        rawFilter:
          "hierarchicalCategories.lvl0:'Womens' AND hierarchicalCategories.lvl1:'Womens > Accessories' AND brand:'even&odd'",
      },
      // This uses context from the Algolia dashboard, configured using Visual Editor
      {
        name: 'Accessoires',
        type: 'context',
        context: 'accessories',
      },
    ],
  },
  GER: {
    index: 'flagship_fashion',
    currency: '€',
    linksHeader: [
      {
        name: 'All',
        type: 'filter',
        filter: '',
        url: '/search',
      },
      {
        name: 'Herren',
        type: 'filter',
        filter: 'Mens',
        url: '/herren',
      },
      {
        name: 'Damen',
        type: 'filter',
        filter: 'Womens',
        url: '/damen',
      },
      // For an uilisation of your own made filter
      {
        name: 'Damen Zubehör Even & Odd',
        type: 'rawFilter',
        filter: '',
        rawFilter:
          "hierarchicalCategories.lvl0:'Womens' AND hierarchicalCategories.lvl1:'Womens > Accessories' AND brand:'even&odd'",
      },
      // This uses context from the Algolia dashboard, configured using Visual Editor
      {
        name: 'Zubehör',
        type: 'context',
        context: 'accessories',
      },
    ],
  },
}

export const languageObjectSelectedAtom = atom({
  key: 'languageObjectSelectedAtom', // unique ID (with respect to other atoms/selectors)
  default: languagesConfig[0], // default value (aka initial value)
})

// Please ignore this atom - DO NOT TOUCH
export const LanguageSelectedAtom = atom({
  key: 'LanguageSelected', // unique ID (with respect to other atoms/selectors)
  default: 'English', // default value (aka initial value)
})
