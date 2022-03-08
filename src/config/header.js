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


export const personaConfig = [
  
  { value: "", label: 'Neutral'},
  {
    value: "stephen_james",
    label: 'Stephen James',
  },
  {
    value: "elizabeth_aniston",
    label: "Elizabeth Aniston",
  },
]


export const personaSelectedAtom = atom({
  key: 'personaSelected', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export const isPersonaMenuOpen = atom({
  key: 'isPersonaMenuOpen', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
