// This file is dedicating to configuring only the steps of the tour

import { useSetRecoilState } from 'recoil';
import { tourStepAtom } from '.';
import { shouldHaveOpenFederatedSearch } from '../federatedConfig';
import fakeTypeQueries from './actions/fakeTypeQueries';
import passStepOnFedClick from './actions/passStepOnFedClick';

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
      content: (
        <>
          <p>
            Welcome to the <b>demo tour!</b> You can click the X or out of this
            box at any moment to close it.{' '}
          </p>

          <p style={{ marginTop: '0.8rem' }}>
            {' '}
            You can also <b>select a specific chapter</b> of the tour in the
            selector below, if you'd like.
          </p>
        </>
      ),
      position: 'center',
    },
    {
      selector: '.homepage',
      content: (
        <p>
          This is the Homepage. It has <b>banners</b> and{' '}
          <b>product carousels</b>, which you can customise.
        </p>
      ),

      // @Ben, some tips: set the position with x and y coordinates so that you can pick exactly where the popover must sit
      position: [30, 30],

      // @Ben, also you can scroll the view so that it doesn't end up in the middle of the page. But the timeout is necessary so that it only scrolls once the tour has done loading
      action: () => {
        setTimeout(() => {
          window.scrollTo(0, 150);
        }, 50);
      },
    },
    {
      selector: '.home-carousel',
      content:
        'This is a carousel, which can be a collection, or it can use our powerful Recommend AI to show personalised products for each user, as well as Trending products.',
      position: [30, 30],
    },
    {
      selector: '.searchbox-container',
      content:
        'This is the searchbox. It offers a unified search experience, which allows you to search for anything you want: products, brands, articles.',
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
      selector: '.homepage',
      content:
        'Here is the federated search experience — it provides lightning fast access to our unified search experience',
      // Ensure fed search opens in this step
      action: () =>
        setTimeout(() => {
          setFederatedSearch(true);
          window.scrollTo(0, 0);
        }, 100),

      position: [30, 30],
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
