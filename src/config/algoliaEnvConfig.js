// ------------------------------------------
// Config Index and Search Client
// ------------------------------------------
import algoliasearch from 'algoliasearch/lite';

// This export represents the information needed for the Algolia API client
export const searchClientCreds = {
  APIKey: 'b5fcdde4a6fd2c831a2706fec93c48b7',
  appID: '853MYZ81KY',
};

// This export is a single instance Algolia API client
export const searchClient = algoliasearch(
  searchClientCreds.appID,
  searchClientCreds.APIKey
);

// DO NOT REMOVE ANYTHING, ONLY RENAME VALUES IF NEEDED
// IF YOU DON'T WANT IT USED, USE FEATURE CONFIG TO TURN OFF
// SEE config.js FOR GENERAL FEATURE CONFIGURATION
export const indexNames = {
  mainIndex: 'flagship_fashion',
  suggestionsIndex: 'flagship_fashion_query_suggestions',
  articlesIndex: 'canda_customDemo_articles',
  injectedContentIndex: 'flagship_fashion_influencers',
};
