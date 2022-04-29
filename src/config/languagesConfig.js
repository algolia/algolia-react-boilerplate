// ------------------------------------------
// Configuration for languages switch across the application
// NB this isn't functional on the flagship index as we only have one language
// ------------------------------------------
import { atom } from 'recoil';

// Define what values are going to be displayed in the language selector
export const languagesConfig = [
  { value: 'English', label: 'English' },
  {
    value: 'German',
    label: 'German',
  },
  {
    value: 'French',
    label: 'French',
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

// Styles for language selection dropdown, please ignore
export const styles = {
  container: () => ({
    border: 'none',
    position: 'relative',
    cursor: 'pointer',
  }),
  control: () => ({
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    cursor: 'pointer',
  }),
  menu: () => ({
    position: 'absolute',
    marginTop: '1rem',
    background: 'white',
    width: '100%',
    zIndex: '10',
    boxShadow: '0px 3px 5px 1px rgba(50, 50, 50, 0.25);',
    borderRadius: '0.3rem',
    padding: '0rem',
    cursor: 'pointer',
  }),
  menuList: () => ({}),
  input: () => ({
    position: 'absolute',
    width: '100%',
    cursor: 'pointer',
    '&input': {
      cursor: 'pointer',
    },
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  indicatorContainer: () => ({
    color: 'black',
    cursor: 'pointer',
  }),
  placeholder: () => ({
    fontFamily: "'Poppins', sans-serif",
    cursor: 'pointer',
  }),
  valueContainer: () => ({
    cursor: 'pointer',
  }),
  option: () => {
    return {
      textTransform: 'capitalize',
      fontFamily: "'Poppins', sans-serif",
      padding: '0.5rem',
      cursor: 'pointer',
      borderRadius: '0.3rem',
      fontSize: '1rem',
      '&:hover': {
        backgroundColor: 'black',
        color: 'white',
      },
    };
  },
  singleValue: () => ({
    fontFamily: "'Poppins', sans-serif",
    textTransform: 'capitalize',
    cursor: 'pointer',
    fontSize: '1rem',
  }),
  dropdownIndicator: () => ({
    color: 'black',
  }),
};
