// Description: This file contains the configuration for the Algolia Explain feature

import { atom } from 'recoil'

// This export is a single instance of the Recoil atom that controls the Explain feature
export const algoliaExplainToggle = atom({
  key: 'algoliaExplainToggle', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})
