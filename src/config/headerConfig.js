import { atom } from 'recoil';

export const logoUrl = 'https://zupimages.net/up/22/13/jv0t.png';

export const linksHeader = atom({
  key: 'linksHeader', // unique ID (with respect to other atoms/selectors)
  default: [
    {
      name: 'All',
      filter: '',
      url: '/search',
    },
    {
      name: 'Mens',
      filter: 'Mens',
      url: '/mens',
    },
    {
      name: 'Womens',
      filter: 'Womens',
      url: '/womens',
    },
    // {
    //   name: 'Kids',
    //   url: '/kids',
    // },
  ], // default value (aka initial value)
});
