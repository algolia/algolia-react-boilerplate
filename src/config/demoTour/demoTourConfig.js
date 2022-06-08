import { atom, useSetRecoilState } from 'recoil';
import { shouldHaveOpenFederatedSearch } from '../federatedConfig';
import passStepOnFedClick from './actions/passStepOnFedClick';
import fakeTypeQueries from './actions/fakeTypeQueries';

// Should we show the demo tour in this demo
export const shouldShowDemoTour = atom({
  key: 'shouldShowDemoTour',
  default: true,
});

// General styles to be applied
// Documentation here: https://github.com/elrumordelaluz/reactour/tree/master/packages/tour#styles-stylesobj--popoverstylesobj--maskstylesobj-1
export const styles = {};

// Atom for tour controller
export const tourStepAtom = atom({
  key: 'tourStep',
  default: 0,
  effects: [
    ({ onSet }) =>
      onSet((newValue, oldValue) => {
        for (const listener of stepListeners) listener(newValue, oldValue);
      }),
  ],
});

// Allows for listening to step changes
const stepListeners = [];

export function addListenerToStepChange(callback) {
  stepListeners.push(callback);
}

export function removeListenerToStepChange(callback) {
  const listenerIndex = stepListeners.indexOf(callback);

  stepListeners.splice(listenerIndex, 1);
}

// Allows for listening to tour opening and closing
const tourToggleListeners = [];

export function addListenerToTourToggle(callback) {
  tourToggleListeners.push(callback);
}

export function removeListenerToTourToggle(callback) {
  const listenerIndex = tourToggleListeners.indexOf(callback);

  tourToggleListeners.splice(listenerIndex, 1);
}

export function announceTourToggle(toggle) {
  for (const listener of tourToggleListeners) listener(toggle);
}

// Steps for the demo tour, these are adjustable
// Documentation here: https://github.com/elrumordelaluz/reactour/tree/master/packages/tour#steps-steptype
export const useSteps = () => {
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
        'Welcome to the demo tour! You can click the X or out of this box at any moment to close it.',
      position: 'center',
    },
    {
      selector: '.searchbox-container',
      content:
        'This is the searchbox. It offers a unified search experience, which allows you to search for anything you want: products, brands, articles',
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
    },
  ];

  return steps;
};
