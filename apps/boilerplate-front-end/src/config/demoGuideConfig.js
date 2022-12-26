import { atom } from 'recoil'

// import personaConfig for displaying in the guide
import { personaConfig } from './personaConfig'

// Should we show the network errors in the demo - might want to switch this to false when demo-ing to a client
export const showNetworkErorrs = atom({
  key: 'showNetworkErorrs',
  default: true,
})

// This atom represents whether the alerts should be shown or not when something in the demo guide is triggered
export const shouldShowAlert = atom({
  key: 'shouldShowAlert',
  default: true,
})

// ------------------------------------------
// Search Terms Guide Config
// Search terms helps you select queries that allow to
// showcase category boost or search within a category
// ------------------------------------------

// Should we show the search terms section in the demo guide
export const shouldShowSearchTerms = atom({
  key: 'shouldShowSearchTerms',
  default: true,
})

// What would be the content of the select in this section
// Is the helped navigation menu should be shown because the button has been clicked
export const isDemoGuideOpen = atom({
  key: 'isDemoGuideOpen', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})

// Store de reference of the component Demo Panel
export const demoGuideBtnRef = atom({
  key: 'demoGuideBtnRef', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
})

// Open alert for Navigation
export const isAlertOpen = atom({
  key: 'isAlertOpen', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})

// Alert content to display
export const alertContent = atom({
  key: 'alertContent', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
})

// ------------------------------------------
// Search Landing Page Config
// ------------------------------------------

// Should we show the landing page section in the demo guide
export const shouldShowLandingPages = atom({
  key: 'shouldShowLandingPages',
  default: true,
})

// Configuration for custom landing page via rules
export const landingPageConfig = [
  { value: '', label: 'Choose', type: 'landing page' },
  {
    value: 'my-landing-page',
    label: 'My Landing Page',
    alertContent: 'SRP now has a custom landing page format',
    details: 'Injects a banner, title and text into the SRP',
    type: 'landing page',
  },
]

// ------------------------------------------
// Search Terms Config
// ------------------------------------------
export const searchTermsConfig = [
  { value: '', label: 'Choose', type: 'search terms' },
  {
    value: 'winter',
    label: 'winter',
    alertContent: 'The categories winter jacket and hike shoes are boosted.',
    details: 'The categories winter jacket and hike shoes will be boosted.',
    type: 'search terms',
  },
  {
    value: 'warm',
    label: 'warm',
    alertContent: 'The categories winter jacket and hike shoes are boosted.',
    details: 'The categories winter jacket and hike shoes will be boosted.',
    type: 'search terms',
  },
]

// ------------------------------------------
// Applied Rules
// Will show the rules applied in the app while browsing
// ------------------------------------------
// Should we show the applied rules Switcher
export const shouldShowAppliedRulesSwitcher = atom({
  key: 'shouldShowAppliedRulesSwitcher',
  default: true,
})
// What should be the information showed to the user
export const appliedRulesInformations = [
  {
    span: 'Rules On',
    details: 'The rules that are apply will be shown live',
  },
]

// ------------------------------------------
// Search Persona Guide Config
// Persona in demo guide allow to select a persona and
// showcase a personalised Search experience
// ------------------------------------------

// Should we show the persona section in the demo guide
export const shouldShowPersonas = atom({
  key: 'shouldShowPersonas',
  default: true,
})

// ------------------------------------------
// Injected Content Guide Config
// Injected content allow to select query that are triggering
// injected content from rules in the dashboard
// ------------------------------------------

// Should we show the injected content section in the demo guide
export const shouldShowInjectedContent = atom({
  key: 'shouldShowInjectedContent',
  default: true,
})

// What would be the content of the select in this section
export const DemoGuideInjectedContentConfig = [
  { value: '', label: 'Choose', type: 'injected content' },
  {
    value: 'Nike',
    label: 'Nike',
    alertContent: 'You are displaying an injected content coupon for Nike',
    details: 'Will display injected content coupon for Nike',
    type: 'injected content',
  },
  {
    value: 'Women',
    label: 'Women',
    alertContent: 'You are displaying an injected content ad with Gigi Hadid',
    details: 'Will display injected content ad with Gigi Hadid',
    type: 'injected content',
  },
]

// ------------------------------------------
// Dynamic Filters Guide Config
// Dynamic filters allow you to showcase facet order for a given query
// ------------------------------------------

// Should we show the Dynamic filter/ Facet ordering section in the demo guide
export const shouldShowDynamicFilters = atom({
  key: 'shouldShowDynamicFilters',
  default: true,
})

// What would be the content of the select in this section
export const DemoGuideDynamicFiltersConfig = [
  { value: '', label: 'Choose', type: 'dynamic filters' },
  {
    value: 'Sandals',
    label: 'Sandals',
    alertContent:
      'This is changing the facets ordering to return size facet first',
    details: 'Will change the facets ordering to return size facet first',
    type: 'dynamic filters',
  },
]

// ------------------------------------------
// Redirects Guide Config
// Redirect section allow to showcase redirection for a given query
// ------------------------------------------

// Should we show the Redirect section in the demo guide
export const shouldShowRedirects = atom({
  key: 'shouldShowRedirects',
  default: true,
})

// What would be the content of the select in this section
export const DemoGuideRedirectConfig = [
  { value: '', label: 'Choose', type: 'redirect' },
  {
    value: 'Faq',
    label: 'FAQ',
    alertContent: "Redirecting the user to Algolia's homepage",
    details: "Will redirect the user to Algolia's homepage",
    type: 'redirect',
  },
]

// ------------------------------------------
// Search Banners Guide Config
// Search Banner section allow to showcase Banner in the search result page
// for a given query
// ------------------------------------------

// Should we show the Banner section in the demo guide
export const shouldShowBanners = atom({
  key: 'shouldShowBanners',
  default: true,
})

// What would be the content of the select in this section
export const searchBannersConfig = [
  { value: '', label: 'Choose', type: 'banner' },
  {
    value: 'help',
    label: 'Help',
    alertContent: 'Displaying an Help banner',
    details: 'Will display an Help banner',
    type: 'banner',
  },
  {
    value: 'woman',
    label: 'Woman',
    alertContent: 'Displaying a Womens banner',
    details: 'Will display a Womens banner',
    type: 'banner',
  },
]

// ------------------------------------------
// Personalisation Guide Config
// The info is imported from personaConfig for display in 'Search Persona'
// ------------------------------------------
export const searchPersonaInformations = personaConfig.map((persona) => {
  const { label, description } = persona
  return {
    span: label,
    details: description,
  }
})

export const isPersonnaEventToggle = atom({
  key: 'isPersonnaEventToggle',
  default: true,
})

// Please ignore this atom - DON'T TOUCH THIS
export const searchpersonaObjectSelectedAtom = atom({
  key: 'searchpersonaObjectSelectedAtom', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
})

// Please ignore this atom - DON'T TOUCH THIS
export const scorePersonadAtom = atom({
  key: 'scorePersonadAtom', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
})

// Please ignore this atom - DON'T TOUCH THIS
export const searchTermsSelectedAtom = atom({
  key: 'searchTermsSelectedAtom', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
})

// Please ignore this atom - DON'T TOUCH THIS
export const searchBannersSelectedAtom = atom({
  key: 'searchBannersSelectedAtom', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
})
