import { atom } from 'recoil';

export const linksHeader = atom({
  key: 'linksHeader', // unique ID (with respect to other atoms/selectors)
  default: [
    {
      link: 'All',
      filter: '',
      url: '/search',
    },
    {
      link: 'Mens',
      filter: 'Mens',
      url: '/mens',
    },
    {
      link: 'Womens',
      filter: 'Womens',
      url: '/womens',
    },
    // {
    //   link: 'Kids',
    //   url: '/kids',
    // },
  ], // default value (aka initial value)
});
