// ------------------------------------------
// Config Index and Search Client
// ------------------------------------------
import algoliasearch from 'algoliasearch/lite';

// RENAME THAT FILE ALGOLIA CONFIG

// Without Atom
export const searchClient = {
  APIKey: 'b5fcdde4a6fd2c831a2706fec93c48b7',
  appID: '853MYZ81KY',
};

export const indexNames = {
  mainIndex: 'flagship_fashion',
  suggestionsIndex: 'flagship_fashion_query_suggestions',
  articlesIndex: 'canda_customDemo_articles',
  injectedContentIndex: 'flagship_fashion_influencers',
};

export const search = algoliasearch(searchClient.appID, searchClient.APIKey);
