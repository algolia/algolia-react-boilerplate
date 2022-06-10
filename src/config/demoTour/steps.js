// This file is dedicating to configuring only the steps of the tour

import { useSetRecoilState } from 'recoil';
import { tourStepAtom } from '.';
import { shouldHaveOpenFederatedSearch } from '../federatedConfig';

// Steps for the demo tour, these are adjustable
// Documentation here: https://github.com/elrumordelaluz/reactour/tree/master/packages/tour#steps-steptype
export default function useSteps() {
  // Get the tour controller
  const setTourStep = useSetRecoilState(tourStepAtom);

  // Get federated search control
  const setFederatedSearch = useSetRecoilState(shouldHaveOpenFederatedSearch);

  // Method to get a step index based on a step name
  const getStepIndex = (stepName) =>
    steps.findIndex(({ name }) => name === stepName);

  // Wrap these methods to easily provide them
  const controlMethods = { setTourStep, setFederatedSearch, getStepIndex };

  const steps = [
    {
      content:
        "Welcome to the demo tour! You can click the X or out of this box at any moment to close it. You can also select a specific chapter of the tour in the selector below, if you'd like",
      position: 'center',
    },
    {
      // I want to select .homepage but reactour moves the window if you choose it.
      // selector: '.overlay',
      content:
        'This is the Homepage. It has banners, and carousels which you can customise.',
      position: 'center',
      // This component should be positioned just above the homepage component, ie: covering the navigation panel
      // styles: {}
    },
    {
      selector: '.home-carousel',
      content:
        'This is a carousel, which can be a collection, or it can use our powerful Recommend AI to show personalised products for each user, as well as Trending products.',
    },
    {
      selector: '.searchbox-container',
      content:
        'This is the searchbox. It offers a unified search experience, which allows you to search for anything you want: products, brands, articles.',
      // action: (searchbox) => {
      //   const input = searchbox.querySelector('input');

      //   // searchbox.dispatchEvent(new Event('input', { bubbles: true }));
      //   setTimeout(() => {
      //     console.log('click!', input);
      //     input.click();
      //   }, 1000);
      // },
    },
    {
      selector: '.searchbox-container',
      content: 'Try clicking it to open the federated search panel!',
      styles: {
        controls: () => ({ display: 'none' }),
      },
      stepInteraction: true,
      action: (searchbox) => passStepOnFedClick(searchbox, controlMethods),
    },
    {
      // Names are useful for calling the getStepIndex method
      name: 'openFedSearch',
      selector: '.federatedSearch',
      content:
        'Here is the federated search experience — it provides lightning fast access to our unified search experience',
      // Ensure fed search opens in this step
      action: () =>
        setTimeout(() => {
          setFederatedSearch(true);
        }, 100),
      stepInteraction: false,
    },
    {
      selector: '.federatedSearch__left',
      resizeObservables: ['.federatedSearch__left'],
      content:
        'Notice that it keeps your recent searches, as well as recommending new queries',
      action: (panel) => {
        // In the panel is not mounted, retrace to the fed open step
        if (panel == undefined) setTourStep(getStepIndex('openFedSearch'));
      },
    },
    {
      selector: '.articles__wrapper',
      resizeObservables: ['.articles__wrapper'],
      content:
        'You can customise what shows up in here to your every desire: even articles are welcome!',
      action: (panel) => {
        // In the panel is not mounted, retrace to the fed open step
        if (panel == undefined) setTourStep(getStepIndex('openFedSearch'));
      },
    },
    {
      selector: '.federatedSearch',
      content: "And the best part? It's all search-as-you-type!",
      stepInteraction: true,
      action: (panel) => fakeTypeQueries(panel, controlMethods),

      highlightedSelectors: ['.searchbox-container', '.federatedSearch'],

      position: [30, 135],
    },
    {
      selector: '.ais-VoiceSearch',
      resizeObservables: ['.ais-VoiceSearch'],
      content: 'This is VoiceSearch - search by saying something',

      // Close fed search
      action: () => setFederatedSearch(false),
    },
    {
      selector: '.container__header-nav__links ',
      content:
        'This is the Navigation section. There are the Categories, Personas and Segments, all customisable!',
    },
    {
      selector: '.container__header-nav-selectors',
      content:
        'Changing the persona or segment will show you how we create unique, AI-powered search experiences',
    },
    {
      selector: '.optionDots__wrapper',
      content:
        'We made a helpful Guide Panel to show some of the awesome features in this demo!',
      stepInteraction: true,
    },
    // {
    //   selector: '.optionDots__wrapper',
    //   content: 'Try clicking it to open the Demo Guide panel!',
    //   styles: {
    //     controls: () => ({ display: 'none' }),
    //   },
    //   stepInteraction: true,
    //   // This action needs building
    //  // action: (searchbox) => passStepOnFedClick(DEMOGUIDE, controlMethods),
    // },
    // TODO: move to '/search' url, display Tour for facets, results, sorts, etc
  ];

  return steps;
}
