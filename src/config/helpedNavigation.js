import { atom } from 'recoil';

// Is the helped navigation should be in the app
export const shouldShowDemoGuide = atom({
  key: 'shouldShowDemoGuide', // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
});

// Is the helped navigation menu should be shown because the button has been clicked
export const isDemoGuideOpen = atom({
  key: 'isDemoGuideOpen', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

// ------------------------------------------
// Search Terms Config
// ------------------------------------------
export const searchTermsConfig = [
  { value: '', label: 'Choose' },
  {
    value: 'ring',
    label: 'Ring',
  },
  {
    value: 'dress',
    label: 'Dress',
  },
];

export const searchTermsInformations = [
  {
    span: 'Ring',
    details: 'The category Bags is boosted.',
  },
  {
    span: 'Dress',
    details: 'Will only search in dress category',
  },
];

// Please ignore this atom
export const searchTermsSelectedAtom = atom({
  key: 'searchTermsSelectedAtom', // unique ID (with respect to other atoms/selectors)
  default: 'anon', // default value (aka initial value)
});

// ------------------------------------------
// Search Banners Config
// ------------------------------------------
export const searchBannersConfig = [
  { value: '', label: 'Choose' },
  {
    value: 'algolia',
    label: 'Algolia',
  },
  {
    value: 'christmas',
    label: 'Christmas',
  },
  {
    value: 'help',
    label: 'Help',
  },
  {
    value: 'woman',
    label: 'Woman',
  },
];

export const searchBannersInformations = [
  {
    span: 'Algolia',
    details: 'Will display an Algolia Banner',
  },
  {
    span: 'Christmas',
    details: 'Will display a Christmas banner',
  },
  {
    span: 'Help',
    details: 'Will display an Help banner',
  },
  {
    span: 'Woman',
    details: 'Will display a Woman banner',
  },
];

// Please ignore this atom
export const searchBannersSelectedAtom = atom({
  key: 'searchTermsSelectedAtom', // unique ID (with respect to other atoms/selectors)
  default: 'anon', // default value (aka initial value)
});

// ------------------------------------------
// Search Persona Config
// ------------------------------------------
export const searchPersonaConfig = [
  { value: 'anon', label: 'Neutral' },
  {
    value: 'stephen_james',
    label: 'Stephen',
  },
  {
    value: 'elizabeth_aniston',
    label: 'Elizabeth',
  },
];

export const searchPersonaInformations = [
  {
    span: 'Neutral',
    details: 'No Persona Selected',
  },
  {
    span: 'Stephen',
    details: 'Stephen James is a man who likes sports shoes',
  },
  {
    span: 'Elizabeth',
    details: 'Elizabeth Aniston is a woman who likes Blue Dresses',
  },
];

// Config on Injected content in Demo guide
export const DemoGuideInjectedContentConfig = [
  { value: '', label: 'Choose' },
  {
    value: 'Nike',
    label: 'Nike',
  },
  {
    value: 'Woman',
    label: 'Woman',
  },
];


export const DemoGuideInjectedContentInformations = [
  {
    span: 'Nike',
    details: 'Will display injected content coupon for Nike',
  },
  {
    span: 'Woman',
    details: 'Will display injected content ad with Gigi Hadid',
  }
];


// Config on Dynamic Filters in Demo guide
export const DemoGuideDynamicFiltersConfig = [
  { value: '', label: 'Choose' },
  {
    value: 'Sandals',
    label: 'Sandals',
  },
];


export const DemoGuideDynamicFiltersInformations = [
  {
    span: 'Sandals',
    details: 'Will change the facets ordering to return size facet first',
  },
 
];
// Config on Redirection in Demo guide
export const DemoGuideRedirectConfig = [
  { value: '', label: 'Choose' },
  {
    value: 'Faq',
    label: 'FAQ',
  },
];


export const DemoGuideRedirectInformations = [
  {
    span: 'FAQ',
    details: 'Will Redirect the user to Algolia\'s homepage',
  },
 
];

// Please ignore this atom
export const searchPersonaSelectedAtom = atom({
  key: 'searchTermsSelectedAtom', // unique ID (with respect to other atoms/selectors)
  default: 'anon', // default value (aka initial value)
});

// Styles for persona selection dropdown, please ignore
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
    width: '6rem',
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
