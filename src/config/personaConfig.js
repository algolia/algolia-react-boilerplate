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
  { value: 'anon', label: 'No Persona', description: 'Anonymous user', personalizationFilters: [] },
  {
    value: 'stephen_james',
    label: 'Stephen',
    description: 'Stephen James is a man who likes sports shoes',
    personalizationFilters: ["genderFilter:men<score=1>", "hierarchicalCategories.lvl2:'Mens > Shoes'<score=1>"]
  },
  {
    value: 'elizabeth_aniston',
    label: 'Elizabeth',
    description: 'Elizabeth is a woman who likes blue dresses',
    personalizationfilters: ["colour:blue<score=1>", "genderFilter:women<score=1>", "hierarchicalCategories.lvl2:'Womens > Clothing > Dresses'<score=1>"]
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

// Styles for persona selection dropdown, please ignore
export const styles = {
  container: () => ({
    border: 'none',
    position: 'relative',
    cursor: 'pointer',
  }),
  control: () => ({
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    cursor: 'pointer',
  }),
  menu: () => ({
    position: 'absolute',
    marginTop: '1rem',
    background: 'white',
    width: '100%',
    zIndex: '10',
    boxShadow: '0px 3px 5px 1px rgba(50, 50, 50, 0.25);',
    borderRadius: '0.3rem',
    padding: '0rem',
    cursor: 'pointer',
  }),
  menuList: () => ({}),
  input: () => ({
    display: 'none',
    position: 'absolute',
    width: '100%',
    cursor: 'pointer',
    '&input': {
      cursor: 'pointer',
    },
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  indicatorContainer: () => ({
    color: 'black',
    cursor: 'pointer',
  }),
  placeholder: () => ({
    fontFamily: "'Poppins', sans-serif",
    cursor: 'pointer',
  }),
  valueContainer: () => ({
    cursor: 'pointer',
  }),
  option: () => {
    return {
      textTransform: 'capitalize',
      fontFamily: "'Poppins', sans-serif",
      padding: '0.5rem',
      cursor: 'pointer',
      borderRadius: '0.3rem',
      fontSize: '1rem',
      '&:hover': {
        backgroundColor: 'black',
        color: 'white',
      },
    };
  },
  singleValue: () => ({
    fontFamily: "'Poppins', sans-serif",
    textTransform: 'capitalize',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 800,
  }),
  dropdownIndicator: () => ({
    color: 'black',
  }),
};