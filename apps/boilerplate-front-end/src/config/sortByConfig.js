// ------------------------------------------
// Configuration for Sort By
// ------------------------------------------
import { selector } from 'recoil'

import { mainIndex } from './algoliaEnvConfig'

// This const defines the indices for sorts, please add or remove from the array as needed
// The values for each index use the prefix of the main index for convenience
export const sortBy = selector({
  key: 'sortBy', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    return {
      value: true,
      labelIndex: [
        { value: get(mainIndex), label: 'All' },
        { value: `${get(mainIndex)}_price_desc`, label: 'Price Desc' },
        { value: `${get(mainIndex)}_price_asc`, label: 'Price Asc' },
      ],
    }
  },
})
