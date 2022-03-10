import { atom } from 'recoil';

// Atom from Recoil

// export const searchClientAtom = atom({
//   key: 'searchClientAtom',
//   default: {
//     APIKey: 'b5fcdde4a6fd2c831a2706fec93c48b7',
//     appID: '853MYZ81KY',
//   },
// });

// ------------------------------------------
// Config Index and Search Client
// ------------------------------------------

// Without Atom
export const searchClient = {
  APIKey: 'b5fcdde4a6fd2c831a2706fec93c48b7',
  appID: '853MYZ81KY',
};

export const indexName = {
  index: 'flagship_fashion',
  indexSuggestion: 'flagship_fashion_query_suggestions',
  indexBlog: 'canda_customDemo_articles',
};

export const indexInfluencer = {
  index: 'flagship_fashion_influencers',
};
