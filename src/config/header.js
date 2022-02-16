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

export const personaConfig = atom({
  key: 'personaConfig', // unique ID (with respect to other atoms/selectors)
  default: [
    { value: '', label: 'All' },
    { value: 'stephen_james', label: 'Stephen James' },
    { value: 'elizabeth_aniston', label: 'Elizabeth Aniston' },
  ],
});

export const personaSelected = atom({
  key: 'personaSelected', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});
