// ------------------------------------------
// Configuration for languages switch across the application
// NB this isn't functional on the flagship index as we only have one language
// ------------------------------------------
import { atom } from 'recoil';

// Define what values are going to be displayed in the language selector
export const languagesConfig = [
  { value: 'English', label: 'English', type: 'language' },
  {
    value: 'German',
    label: 'German',
    type: 'language'
  },
  {
    value: 'French',
    label: 'French',
    type: 'language'
  },
];

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
        filter: 'Men',
        url: '/mens',
      },
      {
        name: 'Womens',
        type: 'filter',
        filter: 'Women',
        url: '/womens',
      },
      {
        name: 'Home',
        type: 'filter',
        filter: 'Home',
        url: '/home',
      },
      {
        name: 'Summer 22 Collection',
        type: 'context',
        context: 'Summer 22 Collection',
        url: '/summer-22-collection',
      },
    ],
  },
  FR: {
    index: 'flagship_fashion_price_desc',
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
        filter: 'Hommes',
        url: '/hommes',
      },
      {
        name: 'Femmes',
        type: 'filter',
        filter: 'Femmes',
        url: '/femmes',
      },
      {
        name: 'La Maison',
        type: 'filter',
        filter: 'La Maison',
        url: '/la-maison',
      },
      {
        name: 'Collection été 2022',
        type: 'context',
        context: 'Collection été 2022',
        url: '/collection-ete-2022',
      },
    ],
  },
  GER: {
    index: 'flagship_fashion_ger',
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
        filter: 'Herren',
        url: '/herren',
      },
      {
        name: 'Damen',
        type: 'filter',
        filter: 'Damen',
        url: '/damen',
      },
      {
        name: 'Home',
        type: 'filter',
        filter: 'Home',
        url: '/home',
      },
      {
        name: 'Summer 22 Collection',
        type: 'context',
        context: 'Summer 22 Collection',
        url: '/summer-22-collection',
      },
    ],
  },
};

// Please ignore this atom - DO NOT TOUCH
export const LanguageSelectedAtom = atom({
  key: 'LanguageSelected', // unique ID (with respect to other atoms/selectors)
  default: 'English', // default value (aka initial value)
});

