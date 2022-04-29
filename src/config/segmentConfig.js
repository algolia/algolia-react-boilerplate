// ------------------------------------------
// Configuration for segments accross the application
// ------------------------------------------
import { atom } from 'recoil';

// ------------------------------------------
// This const defines the options available for segmentation
// The labels will show in a dropdown in the navigation
// The values are what is sent as optional filters to Algolia
// Add or remove objects to this array as you see fit
// ------------------------------------------
export const segmentConfig = [
  { value: '', label: 'No Segment' },
  {
    value: ['season:2022 SPRING', 'hierarchicalCategory.0:Women'],
    label: 'Female New Season Segment',
  },
  {
    value: ['brand:Purple Label', 'hierarchicalCategory.0:Men'],
    label: 'Male Purple Label Segment',
  },
];

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
    gap: '0.5rem',
    width: 'auto',
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
    fontFamily: "'Space Grotesk', 'Comic Sans MS'",
    cursor: 'pointer',
  }),
  valueContainer: () => ({
    cursor: 'pointer',
  }),
  option: () => {
    return {
      textTransform: 'uppercase',
      fontFamily: "'Space Grotesk', 'Comic Sans MS'",
      padding: '0.5rem',
      cursor: 'pointer',
      borderRadius: '0.3rem',
      fontSize: '0.7rem',
      '&:hover': {
        backgroundColor: 'black',
        color: 'white',
      },
    };
  },
  singleValue: () => ({
    fontFamily: "'Space Grotesk', 'Comic Sans MS'",
    textTransform: 'uppercase',
    cursor: 'pointer',
    fontSize: '0.7rem',
  }),
  dropdownIndicator: () => ({
    color: 'black',
  }),
};

// Please ignore this atom
export const segmentSelectedAtom = atom({
  key: 'segmentSelected', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

// Please ignore this atom
export const isSegmentMenuOpen = atom({
  key: 'isSegmentMenuOpen', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
