// Component that renders the Current Refinements (icons above the products)
import { useCurrentRefinements } from 'react-instantsearch-hooks-web'
// Recoil State
import { useRecoilState } from 'recoil'
// import config file for state of facets
import { hitsConfig } from '@/config/hitsConfig'

import { navigationStateAtom } from '@/config/navigationConfig'

// Function to display the price in a right format for the currentRefinement
const displayPrice = (i, currencySymbol, refinementPriceLabels) => {
  const { moreThan, lessThan } = refinementPriceLabels

  // Split the label into an array to work on split
  const arraySplitLabel = i.label.replace(`<= ${i.attribute}`, '').split(' ')
  if (
    i.label.includes(i.currentRefinement.max) &&
    !i.label.includes(i.currentRefinement.min)
  ) {
    return `${lessThan} ${arraySplitLabel[2]} ${currencySymbol}`
  }
  if (
    i.label.includes(i.currentRefinement.min) &&
    !i.label.includes(i.currentRefinement.max)
  ) {
    return `${moreThan} ${arraySplitLabel[0]} ${currencySymbol}`
  }
  return (
    `${arraySplitLabel[0]} ${currencySymbol} ` +
    `-` +
    ` ${arraySplitLabel[3]} ${currencySymbol}`
  )
}

// Function to display the color_refinement_list in a right format for the color-refinement
const displayColor = (i) => {
  const newColorRefinement = i.split(';')[0]
  return newColorRefinement
}

function CurrentRefinements(props) {
  const { items, refine, createURL } = useCurrentRefinements(props)
  const { colourHexa } = hitsConfig

  return (
    <div className="refinement-container__refinements">
      {items.map((item, index) => {
        return (
          <CurrentRefinementGeneral
            key={index}
            colourHexa={colourHexa}
            item={item}
            refine={refine}
          />
        )
      })}
    </div>
  )
}

function CurrentRefinementGeneral({ item, colourHexa, refine }) {
  const [navigationState, setNavigationState] =
    useRecoilState(navigationStateAtom)

  return (
    <ul className="refinement-container__refinementsInner">
      {item.refinements.map((nested) => {
        return (
          <li key={nested.label}>
            <a
              onClick={(event) => {
                event.preventDefault()

                if (
                  event.target.innerText.toLowerCase() ===
                  navigationState.name.toLowerCase()
                ) {
                  setNavigationState({})
                }
                refine(nested)
              }}
            >
              {navigationState.value === nested.label ? (
                <p>{navigationState.name}</p>
              ) : colourHexa ? (
                <p>{displayColor(nested.label)}</p>
              ) : (
                <p>{nested.label}</p>
              )}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export default CurrentRefinements

// KEEPING THIS CODE JUST IN CASE
//____________________________________________________________________
// if (item.attribute.includes('price')) {
//   return (
//     <Fragment key={item.value}>
//       {item.items ? (
//         <>
//           <CurrentRefinementGeneral item={item} />
//         </>
//       ) : (
//         <>
//           <CurrentRefinementGeneral item={item} />
//         </>
//       )}
//     </Fragment>
//   )
// }
// if (item.attribute.includes(colourHexa)) {
//   return (
//     <li key={item.label}>
//       {item.refinements ? (
//         <>
//           <CurrentRefinementGeneral item={item} colourHexa={true} />
//         </>
//       ) : (
//         <a
//           href={createURL(item.value)}
//           onClick={(event) => {
//             event.preventDefault()
//             refine(item.value)
//           }}
//         >
//           <p>{displayColor(item)}</p>
//         </a>
//       )}
//     </li>
//   )
// }
