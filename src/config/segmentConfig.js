// ------------------------------------------
// Configuration for looking a segment of products across the application
// ------------------------------------------
import { atom } from 'recoil'

// ------------------------------------------
// This const defines the personas available for personalisation
// The labels will show in a dropdown in the navigation
// The values are what is sent as the userToken to Algolia
// Add or remove objects to this array as you see fit
// Just make sure you have events and profiles for your values
// ------------------------------------------
export const segmentConfig = [
  { value: '', label: 'Segment', description: 'No Segment' },
  {
    value: ['season:2022 SPRING', 'hierarchicalCategory.0:Women'],
    label: 'Segment One',
    description: `eg: Segment for Women's New Season`
  },
  {
    value: ['brand:Purple Label', 'hierarchicalCategory.0:Men'],
    label: 'Segment Two',
    description: `eg: Segment for Men's Purple Clothes`
  },
]

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
    }
  },
  singleValue: () => ({
    fontFamily: "'Poppins', sans-serif",
    textTransform: 'capitalize',
    cursor: 'pointer',
    fontSize: '1rem',
  }),
  dropdownIndicator: () => ({
    color: 'black',
  }),
}

// Please ignore this atom
export const segmentSelectedAtom = atom({
  key: 'segmentSelected', // unique ID (with respect to other atoms/selectors)
  default: 'anon', // default value (aka initial value)
})

// Please ignore this atom
export const isSegmentMenuOpen = atom({
  key: 'isSegmentMenuOpen', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})
