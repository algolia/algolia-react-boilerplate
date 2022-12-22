import { useEffect, useState } from 'react'

const TrendingFacetsItem = ({ trendingFacetValue, items, refine }) => {
  // trendingFacet prop comes from Recommend, it is not a refinementList item, but we need a refinementList item to do things like refine.
  // We look up the refinementList item which matches the current Recommend item (they are both facet values) and switch item.
  // Item is now the refinementList item, so we can access all of correct functionality like isRefined etc.
  const [isBusy, setBusy] = useState(true)
  const [mergedItem, setMergedItem] = useState(null)

  useEffect(() => {
    if (items.length > 0) {
      let newItems = items.filter(
        (facet) => facet.label === trendingFacetValue.facetValue
      )
      setMergedItem(newItems[0])
      setBusy(false)
    }
  }, [items])

  return (
    <>
      {mergedItem && !isBusy && (
        <button
          className={`filters-container__content__list__button-filter ${
            mergedItem.isRefined ? 'refined-filter' : ''
          }`}
          type="button"
          href="#"
          onClick={(event) => {
            event.preventDefault()
            refine(mergedItem.value)
          }}
        >
          <p>{mergedItem.label}</p>
          <span className="filters-container__content__list__refinement-count">
            {mergedItem.count}
          </span>
        </button>
      )}
    </>
  )
}

export default TrendingFacetsItem
