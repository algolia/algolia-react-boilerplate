// ------------------------------------------
// Configuration for segments accross the application
// ------------------------------------------
import { atom } from 'recoil'

// ------------------------------------------
// This const defines the options available for segmentation
// The labels will show in a dropdown in the navigation
// The values are what is sent as optional filters to Algolia
// Add or remove objects to this array as you see fit
// ------------------------------------------
export const segmentConfig = [
  {
    value: '',
    label: 'No Segment',
    labelFr: 'Pas de segment',
    labelGer: 'Kein abschnitt',
    type: 'segment',
  },
  {
    value: ['hierarchicalCategories.lvl0:Womens'],
    label: 'Female Segment',
    type: 'segment',
  },
  {
    value: ['hierarchicalCategories.lvl0:Mens'],
    label: 'Male Segment',
    type: 'segment',
  },
]

// Please ignore this atom
export const segmentObjectSelectedAtom = atom({
  key: 'segmentObjectSelectedAtom', // unique ID (with respect to other atoms/selectors)
  default: segmentConfig[0], // default value (aka initial value)
})

// Please ignore this atom
export const isSegmentMenuOpen = atom({
  key: 'isSegmentMenuOpen', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})
