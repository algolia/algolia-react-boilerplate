import { atom } from 'recoil';

export const linksHeader = atom({
  key: 'linksHeader', // unique ID (with respect to other atoms/selectors)
  default: [
    {
      link: 'All',
      url: '/search',
    },
    {
      link: 'Mens',
      url: '/mens',
    },
    {
      link: 'Womens',
      url: '/womens',
    },
    // {
    //   link: 'Kids',
    //   url: '/kids',
    // },
  ], // default value (aka initial value)
});
