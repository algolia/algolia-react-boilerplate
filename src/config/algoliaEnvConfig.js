// ------------------------------------------
// Config Index and Search Client
// ------------------------------------------

import algoliarecommend from '@algolia/recommend';
import algoliasearch from 'algoliasearch';
import { atom, selector } from 'recoil';








// ADJUST THE APIKEY AND APPID TO YOUR OWN
export const searchClientCreds = {
  APIKey: '05fcc691f3a833263d63a9b425e14176',
  writeOrAdminApiKey: '3ffb6e732af799b311c7b9226ef786ea',
  appID: 'RSBCBF0EG8',
  // Used to get the Persona Strat and score if you haven't got one you have to create one in you API Keys
  // https://www.algolia.com/doc/rest-api/personalization/#get-the-current-personalization-strategy
  personaStrategyAPIKey: 'dfba185370c6b79ddf61674594144976',
};

// ADJUST THE DEFAULT VALUE TO YOUR MAIN INDEX
export const mainIndex = atom({
  key: 'mainIndex', // unique ID (with respect to other atoms/selectors)
  default: 'off_white_custom_demo_english', // default value (aka initial value)
});

// ADJUST THE VALUES FOR EACH INDEX NAME IF YOU HAVE THEM
// IF YOU DO NOT HAVE ONE, IGNORE THE VALUE - DO NOT CHANGE IT
export const indexNames = selector({
  key: 'indexNames', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    return {
      suggestionsIndex: `${get(mainIndex)}_query_suggestions`,
      articlesIndex: 'off_white_custom_demo_news',
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



// Export an active insights client
// export const insightsClient = aa;

