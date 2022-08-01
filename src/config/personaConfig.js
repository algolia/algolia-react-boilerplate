// ------------------------------------------
// Configuration for personalisation accross the application
// ------------------------------------------
import { atom } from 'recoil';

export const personalizationImpact = 98

// ------------------------------------------
// This const defines the personas available for personalisation
// The labels will show in a dropdown in the navigation
// The values are what is sent as the userToken to Algolia
// The personalizationFilters will fake perso profiles at query time so you don't need to send events
// You do however need to have perso feature enabled on the plan, and the strategy created
// Add or remove objects to the personaConfig array as you see fit
// ------------------------------------------
export const personaConfig = [

  { value: 'anon', label: 'No Persona', description: 'Anonymous user', type: 'persona', personalizationFilters: [] },

  {
    value: 'stephen_james',
    label: 'Stephen',
    description: 'Stephen James is a man who likes sports shoes',
    type: 'persona',
    personalizationFilters: ["genderFilter:men<score=1>", "hierarchicalCategories.lvl2:'Mens > Shoes'<score=1>"]

  },
  {
    value: 'elizabeth_aniston',
    label: 'Elizabeth',
    description: 'Elizabeth is a woman who likes blue dresses',
    type: 'persona',
    personalizationFilters: ["colour:blue<score=1>", "genderFilter:women<score=1>", "hierarchicalCategories.lvl2:'Womens > Clothing > Dresses'<score=1>"]
  },
];



// Please ignore this atom
export const personaSelectedAtom = atom({
  key: 'personaSelected', // unique ID (with respect to other atoms/selectors)
  default: personaConfig[0].value, // default value (aka initial value)
});


export const personaSelectedFiltersAtom = atom({
  key: 'personaFiltersSelected', // unique ID (with respect to other atoms/selectors)
  default: personaConfig[0].personalizationFilters, // default value (aka initial value)
});


// Please ignore this atom
export const isPersonaMenuOpen = atom({
  key: 'isPersonaMenuOpen', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});



