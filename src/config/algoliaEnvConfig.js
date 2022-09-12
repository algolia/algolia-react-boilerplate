// ------------------------------------------
// Config Index and Search Client
// ------------------------------------------

import algoliarecommend from '@algolia/recommend';
import algoliasearch from 'algoliasearch';
import { atom, selector } from 'recoil';
import aa from 'search-insights';

// ADJUST THE APIKEY AND APPID TO YOUR OWN
export const searchClientCreds = {
  APIKey: '37ca4ea165c91a4205ada83bdca9689d',
  appID: 'RSBCBF0EG8',
  // Used to get the Persona Strat and score if you haven't got one you have to create one in you API Keys
  // https://www.algolia.com/doc/rest-api/personalization/#get-the-current-personalization-strategy
  recommendApi: '4983f1e3449111609c1e7688209b787b',
};

// ADJUST THE DEFAULT VALUE TO YOUR MAIN INDEX
export const mainIndex = atom({
  key: 'mainIndex', // unique ID (with respect to other atoms/selectors)
  default: 'wilko_demo', // default value (aka initial value)
});

// ADJUST THE VALUES FOR EACH INDEX NAME IF YOU HAVE THEM
// IF YOU DO NOT HAVE ONE, IGNORE THE VALUE - DO NOT CHANGE IT
export const indexNames = selector({
  key: 'indexNames', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    return {
      suggestionsIndex: `${get(mainIndex)}_query_suggestions`,
      articlesIndex: 'wilko_demo_articles',
      injectedContentIndex: `${get(mainIndex)}_influencers`,
    };
  },
});

/* DO NOT ADJUST ANYTHING BEYOND THIS POINT */

// This export is a single instance Algolia API client
export const searchClient = algoliasearch(
  searchClientCreds.appID,
  searchClientCreds.APIKey
);

export const recommendClient = algoliarecommend(
  searchClientCreds.appID,
  searchClientCreds.APIKey
);

// Initialise insights client
aa('init', {
  appId: searchClientCreds.appID,
  apiKey: searchClientCreds.APIKey,
});

// Export an active insights client
export const insightsClient = aa;
