// ------------------------------------------
// Configuration for personalisation accross the application
// ------------------------------------------
import { atom } from 'recoil';

// ------------------------------------------
// This const defines the personas available for personalisation
// The labels will show in a dropdown in the navigation
// The values are what is sent as the userToken to Algolia
// Add or remove objects to this array as you see fit
// Just make sure you have events and profiles for your values
// ------------------------------------------
export const personaConfig = [
  { value: '', label: 'No Persona', description: 'Anonymous user', type: 'persona' },
  {
    value: 'stephen_james',
    label: 'Stephen',
    description: 'Stephen James is a man who likes sports shoes',
    type: 'persona'
  },
  {
    value: 'elizabeth_aniston',
    label: 'Elizabeth',
    description: 'Elizabeth is a woman who likes blue dresses',
    type: 'persona'
  },
];


// Please ignore this atom
export const personaSelectedAtom = atom({
  key: 'personaSelected', // unique ID (with respect to other atoms/selectors)
  default: personaConfig[0].value, // default value (aka initial value)
});

// Please ignore this atom
export const isPersonaMenuOpen = atom({
  key: 'isPersonaMenuOpen', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
