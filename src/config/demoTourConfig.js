import { atom, useSetRecoilState } from 'recoil';

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
});

// Steps for the demo tour, these are adjustable
// Documentation here: https://github.com/elrumordelaluz/reactour/tree/master/packages/tour#steps-steptype
export const useSteps = () => {
  // Get the tour controller
  const setTourStep = useSetRecoilState(tourStepAtom);

  return [
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
      action: (searchbox) => {
        const input = searchbox.querySelector('input');

        // Remember the current step
        let stepCache = null;

        // Use setter to get access to the real current step
        setTourStep((currentStep) => (stepCache = currentStep));

        // Listen for user click
        function passStepOnClick() {
          console.log('ye boy');

          setTourStep((currentStep) => {
            // Avoid passing the step in a later step
            console.log(stepCache, currentStep);

            if (stepCache == currentStep) return currentStep + 1;
            else return currentStep;
          });

          // Also remove listener on trigger
          input.removeEventListener('click', passStepOnClick);
        }

        input.addEventListener('click', passStepOnClick);
      },
    },
    // {
    //   selector: '.federatedSearch',
    //   content:
    //     'Here is the federated search experience — it provides a lightning fast access to our unified search experience',
    //   // Ensure fed search opens in this step
    //   action: () => {},
    // },
    {
      selector: '.ais-VoiceSearch',
      content: 'This is VoiceSearch - search by saying something',
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
};
