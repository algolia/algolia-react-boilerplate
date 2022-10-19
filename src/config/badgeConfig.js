import get from 'lodash/get'

// Please add your badge criteria in this array using the format outlined below.
// Please note that for now, only one badge can be shown, and the higher priority badges come at the end of the array.

// So if a hit matches two badges, one in the first element and one in the last,
// the last one in this array is the one which will be shown
const criteriaConditionals = [
  {
    conditional: {
      // if the item is promoted by a rule
      attribute: '_rankingInfo.promoted',
      condition: true,
      badgeTitle: 'Popular',
    },
  },
  {
    conditional: {
      // if the item is in a specific season
      attribute: 'season',
      condition: '2022 SPRING',
      badgeTitle: 'New Season',
    },
  },
]

// Please ignore this function
export const badgeCriteria = (hit) => {
  let title = null

  criteriaConditionals.map((obj) => {
    const { attribute, condition, badgeTitle } = obj.conditional

    if (get(hit, attribute) === condition) {
      title = badgeTitle
    }
  })

  return title
}
