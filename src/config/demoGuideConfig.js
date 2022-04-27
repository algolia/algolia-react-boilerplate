
import { atom } from 'recoil';
import { segmentConfig } from './segmentConfig';

// Should we show the demo guide in this demo
export const shouldShowDemoGuide = atom({
  key: 'shouldShowDemoGuide',
  default: true,
});

// This atom represents whether the alerts should be shown or not when something in the demo guide is triggered
export const shouldShowAlert = atom({
  key: 'shouldShowAlert',
  default: true,
});

// ------------------------------------------
// Search Terms Guide Config
// Search terms helps you select queries that allow to
// showcase category boost or search within a category
// ------------------------------------------

// Should we show the search terms section in the demo guide
export const shouldShowSearchTerms = atom({
  key: 'shouldShowSearchTerms',
  default: true,
});

// What would be the content of the select in this section
// Is the helped navigation menu should be shown because the button has been clicked
export const isDemoGuideOpen = atom({
  key: 'isDemoGuideOpen', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

// Store de reference of the component Demo Panel
export const demoGuideBtnRef = atom({
  key: 'demoGuideBtnRef', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

// Open alert for Navigation
export const isAlertOpen = atom({
  key: 'isAlertOpen', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

// Alert content to display
export const alertContent = atom({
  key: 'alertContent', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

// ------------------------------------------
// Search Terms Config
// ------------------------------------------
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

// What would be the content of the alert when you're selecting a query
export const searchTermsInformations = [
  {
    span: 'Ring',
    details: 'The category Bags will be boosted.',
  },
  {
    span: 'Dress',
    details: 'Will only search in dress category',
  },
];

// ------------------------------------------
// Segment Guide Config
// ------------------------------------------

export const searchSegmentConfig = [
  { value: '', label: 'Segment', description: 'No Segment' },
  {
    value: ['season:2022 SPRING', 'hierarchicalCategory.0:Women'],
    label: 'Segment One',
    description: `eg: Segment for Women's New Season`
  },
  {
    value: ['brand:Purple Label', 'hierarchicalCategory.0:Men'],
    label: 'Segment Two',
    description: `eg: Segment for Men's Purple Clothes`
  },
]

export const searchSegmentInformations = segmentConfig.map((segment) => {
  const { label, description } = segment
  return {
    span: label,
    details: description
  }
})

// ------------------------------------------
// Search Persona Guide Config
// Persona in demo guide allow to select a persona and
// showcase a personalised Search experience
// ------------------------------------------

// Should we show the persona section in the demo guide
export const shouldShowPersonas = atom({
  key: 'shouldShowPersonas',
  default: true,
});

export const shouldShowSegments = atom({
  key: 'shouldShowSegments',
  default: true
})

// What would be the content of the select in this section
export const searchPersonaConfig = [
  { value: '', label: 'Neutral' },
  {
    value: 'stephen_james',
    label: 'Stephen',
    alertContent:
      'Search is personalised - Stephen James is a man who likes sports shoes',
  },
  {
    value: 'elizabeth_aniston',
    label: 'Elizabeth',
    alertContent:
      'Search is personalised - Elizabeth Aniston is a woman who likes Blue Dresses',
  },
];

// What would be the content of the alert when you're selecting a persona
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

// ------------------------------------------
// Injected Content Guide Config
// Injected content allow to select query that are triggering
// injected content from rules in the dashboard
// ------------------------------------------

// Should we show the injected content section in the demo guide
export const shouldShowInjectedContent = atom({
  key: 'shouldShowInjectedContent',
  default: true,
});

// What would be the content of the select in this section
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

// What would be the content of the alert when you're selecting a query
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

// ------------------------------------------
// Dynamic Filters Guide Config
// Dynamic filters allow you to showcase facet order for a given query
// ------------------------------------------

// Should we show the Dynamic filter/ Facet ordering section in the demo guide
export const shouldShowDynamicFilters = atom({
  key: 'shouldShowDynamicFilters',
  default: true,
});

// What would be the content of the select in this section
export const DemoGuideDynamicFiltersConfig = [
  { value: '', label: 'Choose' },
  {
    value: 'Sandals',
    label: 'Sandals',
    alertContent:
      'This is changing the facets ordering to return size facet first',
  },
];

// What would be the content of the alert when you're selecting a query
export const DemoGuideDynamicFiltersInformations = [
  {
    span: 'Sandals',
    details: 'Will change the facets ordering to return size facet first',
  },
];

// ------------------------------------------
// Redirects Guide Config
// Redirect section allow to showcase redirection for a given query
// ------------------------------------------

// Should we show the Redirect section in the demo guide
export const shouldShowRedirects = atom({
  key: 'shouldShowRedirects',
  default: true,
});

// What would be the content of the select in this section
export const DemoGuideRedirectConfig = [
  { value: '', label: 'Choose' },
  {
    value: 'Faq',
    label: 'FAQ',
    alertContent: "Redirecting the user to Algolia's homepage",
  },
];

// What would be the content of the alert when you're selecting a query
export const DemoGuideRedirectInformations = [
  {
    span: 'FAQ',
    details: "Will redirect the user to Algolia's homepage",
  },
];

// ------------------------------------------
// Search Banners Guide Config
// Search Banner section allow to showcase Banner in the search result page
// for a given query
// ------------------------------------------

// Should we show the Banner section in the demo guide
export const shouldShowBanners = atom({
  key: 'shouldShowBanners',
  default: true,
});

// What would be the content of the select in this section
export const searchBannersConfig = [
  { value: '', label: 'Choose' },
  {
    value: 'algolia',
    label: 'Algolia',
    alertContent: 'Displaying an Algolia Banner',
  },
  {
    value: 'help',
    label: 'Help',
    alertContent: 'Displaying an Help banner',
  },
  {
    value: 'woman',
    label: 'Woman',
    alertContent: 'Displaying a Woman banner',
  },
];

// What would be the content of the alert when you're selecting a query
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

// Please ignore this atom - DON'T TOUCH THIS
export const searchPersonaSelectedAtom = atom({
  key: 'searchPersonaSelectedAtom', // unique ID (with respect to other atoms/selectors)
  default: 'anon', // default value (aka initial value)
});

// Please ignore this atom - DON'T TOUCH THIS
export const searchTermsSelectedAtom = atom({
  key: 'searchTermsSelectedAtom', // unique ID (with respect to other atoms/selectors)
  default: 'anon', // default value (aka initial value)
});

// Please ignore this atom - DON'T TOUCH THIS
export const searchBannersSelectedAtom = atom({
  key: 'searchBannersSelectedAtom', // unique ID (with respect to other atoms/selectors)
  default: 'anon', // default value (aka initial value)
});

// Styles for persona selection dropdown, please ignore - DON'T TOUCH THIS
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
