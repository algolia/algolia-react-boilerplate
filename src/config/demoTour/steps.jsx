// This file is dedicating to configuring only the steps of the tour

import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { tourStepAtom } from '.';
import { shouldHaveOpenFederatedSearch } from '../federatedConfig';
import fakeTypeQueries from './actions/fakeTypeQueries';
import passStepOnFedClick from './actions/passStepOnFedClick';

// Steps for the demo tour, these are adjustable
// Documentation here: https://github.com/elrumordelaluz/reactour/tree/master/packages/tour#steps-steptype
// When onlyGetChapters is true, it returns a list of an object per chapter.
// Whe objects contain the attributes "chapter" and "firstStepIndex" (which has the index of the first step in this chapter)
export default function useSteps(onlyGetChapters = false) {
  // Get the tour controller
  const setTourStep = useSetRecoilState(tourStepAtom);

  // Get federated search control
  const setFederatedSearch = useSetRecoilState(shouldHaveOpenFederatedSearch);

  // Method to go to the first step of a given chapter
  const goToChapter = (targetChapter) => {
    // Count how many steps have we passed through
    let stepsSeen = 0;

    for (const [chapter, chapterSteps] of Object.entries(steps)) {
      if (targetChapter == chapter) setTourStep(stepsSeen);

      stepsSeen += chapterSteps.length;
    }
  };

  // Access to routes
  const navigate = useNavigate();

  // Wrap these methods to easily provide them
  const controlMethods = {
    setTourStep,
    setFederatedSearch,
    goToChapter,
    navigate,
  };

  const steps = {
    Introduction: [
      {
        content: (
          <>
            <p>
              Welcome to the <b>demo tour!</b> You can click the X or out of
              this box at any moment to close it.{' '}
            </p>

            <p style={{ marginTop: '0.8rem' }}>
              You can also <b>select a specific chapter</b> of the tour in the
              selector below, if you'd like.
            </p>
          </>
        ),
        position: 'center',
      },
    ],

    Homepage: [
      {
        selector: '.homepage',
        mutationObservables: ['.homepage'],

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
            navigate('/');
            setFederatedSearch(false);

            window.scrollTo(0, 150);
          }, 50);
        },
      },
      {
        selector: '.home-carousel',
        content:
          'This is a carousel, which can be a collection, or it can use our powerful Recommend AI to show personalised products for each user, as well as Trending products.',
        position: [30, 30],
        action: (panel) => {
          // In the carousel is not mounted, retrace to the first chapter step
          if (panel == undefined) goToChapter('Homepage');
        },
      },
    ],

    Header: [
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
      {
        selector: '.ais-VoiceSearch',
        resizeObservables: ['.ais-VoiceSearch'],
        content: 'This is VoiceSearch - search by saying something',

        // Close fed search
        action: () => setFederatedSearch(false),
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
    ],

    FederatedSearch: [
      {
        selector: '.homepage',
        content:
          'Here is the federated search experience — it provides lightning fast access to our unified search experience',
        // Ensure fed search opens in this step
        action: () =>
          setTimeout(() => {
            navigate('/');
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
          if (panel == undefined) goToChapter('FederatedSearch');
        },
      },
      {
        selector: '.articles__wrapper',
        resizeObservables: ['.articles__wrapper'],
        content:
          'You can customise what shows up in here to your every desire: even articles are welcome!',
        action: (panel) => {
          // In the panel is not mounted, retrace to the fed open step
          if (panel == undefined) goToChapter('FederatedSearch');
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
        selector: '.searchbox-container',
        content: (
          <p>
            When you hit <b>enter</b> in the searchbar, you'll be directed to
            the <b>search results page</b>, where you can browse the products
            more freely.
          </p>
        ),

        position: [30, 135],
      },
    ],

    SearchResults: [
      {
        selector: '.srp',

        content: (
          <p>
            And here is our <b>search results page!</b> In it, you'll find
            detailed product results, as well as powerful methods to{' '}
            <b>further refine</b> your search.
          </p>
        ),
        // Ensure search results opens in this step
        action: () =>
          setTimeout(() => {
            navigate('/search');
            setFederatedSearch(false);
            window.scrollTo(0, 0);
          }, 100),

        position: [30, 30],
        stepInteraction: false,
      },
    ],
  };

  // If we only need the chapters, let's count them
  if (onlyGetChapters) {
    // Will count how many steps have been seen as we loop through the chapters
    let totalStepsSeen = 0;

    const chapters = [];

    for (const [chapter, chapterSteps] of Object.entries(steps)) {
      chapters.push({ chapter, firstStepIndex: totalStepsSeen });

      // Count the steps
      totalStepsSeen += chapterSteps.length;
    }

    return chapters;
  }

  // This method allows to interpret the steps chapters and process them into a single list of steps, where the first step of each chapter will contain a "chapter: <chapter-name>" property
  function processStepChapters() {
    let finalSteps = [];

    // For each chapter
    for (const [chapter, chapterSteps] of Object.entries(steps)) {
      // Give the first step the chapter property
      chapterSteps[0].chapter = chapter;

      // Place the chapter's steps in the list
      finalSteps = finalSteps.concat(chapterSteps);
    }

    return finalSteps;
  }

  return processStepChapters();
}
