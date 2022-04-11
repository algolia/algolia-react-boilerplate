import { atom } from 'recoil';

// This atom represents whether the demo guide should be available or note
export const shouldShowDemoGuide = atom({
  key: 'shouldShowDemoGuide',
  default: true,
});

// ------------------------------------------
// Search Terms Config
// ------------------------------------------

// Configuration for search terms
export const searchTermsConfig = [
  { value: '', label: 'Choose' },
  {
    value: 'ring',
    label: 'Ring',
    alertContent: 'The category Bags is boosted.',
  },
  {
    value: 'dress',
    label: 'Dress',
    alertContent: 'You are searching in dress category',
  },
];

// Alert information for search terms
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

// ------------------------------------------
// Search Persona Config
// ------------------------------------------
export const searchPersonaConfig = [
  { value: 'anon', label: 'Neutral' },
  {
    value: 'stephen_james',
    label: 'Stephen',
    alertContent: 'Stephen James is a man who likes sports shoes',
  },
  {
    value: 'elizabeth_aniston',
    label: 'Elizabeth',
    alertContent: 'Elizabeth Aniston is a woman who likes Blue Dresses',
  },
];

// Alert information for search personas
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
    alertContent: 'You are displaying an injected content coupon for Nike',
  },
  {
    value: 'Women',
    label: 'Women',
    alertContent: 'You are displaying an injected content ad with Gigi Hadid',
  },
];

// Alert information for injected content
export const DemoGuideInjectedContentInformations = [
  {
    span: 'Nike',
    details: 'Will display injected content coupon for Nike',
  },
  {
    span: 'Woman',
    details: 'Will display injected content ad with Gigi Hadid',
  },
];

// Config on Dynamic Filters in Demo guide
export const DemoGuideDynamicFiltersConfig = [
  { value: '', label: 'Choose' },
  {
    value: 'Sandals',
    label: 'Sandals',
    alertContent:
      'This is changing the facets ordering to return size facet first',
  },
];

// Alert information for dynamic filters
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
    alertContent: "You'll Redirect the user to Algolia's homepage",
  },
];

// Alert informatio for redirects
export const DemoGuideRedirectInformations = [
  {
    span: 'FAQ',
    details: "Will Redirect the user to Algolia's homepage",
  },
];

// ------------------------------------------
// Search Banners Config
// ------------------------------------------
export const searchBannersConfig = [
  { value: '', label: 'Choose' },
  {
    value: 'algolia',
    label: 'Algolia',
    alertContent: 'Will display an Algolia Banner',
  },
  {
    value: 'help',
    label: 'Help',
    alertContent: 'Will display an Help banner',
  },
  {
    value: 'woman',
    label: 'Woman',
    alertContent: 'Will display a Woman banner',
  },
];

// Alert information for banners
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
export const searchPersonaSelectedAtom = atom({
  key: 'searchPersonaSelectedAtom', // unique ID (with respect to other atoms/selectors)
  default: 'anon', // default value (aka initial value)
});

// Please ignore this atom
export const searchTermsSelectedAtom = atom({
  key: 'searchTermsSelectedAtom', // unique ID (with respect to other atoms/selectors)
  default: 'anon', // default value (aka initial value)
});

// Please ignore this atom
export const searchBannersSelectedAtom = atom({
  key: 'searchBannersSelectedAtom', // unique ID (with respect to other atoms/selectors)
  default: 'anon', // default value (aka initial value)
});

// Please ignore this atom
export const isDemoGuideOpen = atom({
  key: 'isDemoGuideOpen', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

// Please ignore this atom
export const demoGuideBtnRef = atom({
  key: 'demoGuideBtnRef', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

// Open alert for Navigation
// Please ignore this atom
export const isAlertOpen = atom({
  key: 'isAlertOpen', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

// Alert content to display
// Please ignore this atom
export const alertContent = atom({
  key: 'alertContent', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
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
