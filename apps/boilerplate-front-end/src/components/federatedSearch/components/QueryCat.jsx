import { Glass, Return } from '@/assets/svg/SvgIndex'
import { useEffect, useState } from 'react'

const QueryCat = ({ queryCategorization, query }) => {
  const type = queryCategorization.type
  const [category, setCategory] = useState(null)
  const [categoryAmbiguous, setCategoryAmbiguous] = useState([])

  useEffect(() => {
    if (type === 'ambiguous') {
      setCategoryAmbiguous(queryCategorization?.categories)
    } else {
      setCategory(
        queryCategorization?.categories[0]?.hierarchyPath[
          queryCategorization?.categories[0]?.hierarchyPath.length - 1
        ].facetValue
      )
    }
  }, [queryCategorization])

  const renderAmbiguous = (categoryAmbiguous) => {
    {
      return categoryAmbiguous.map((category) => {
        return (
          <div className="query-cat-container__result__return">
            <Return />
            <p>
              {
                category?.hierarchyPath[category.hierarchyPath.length - 1]
                  .facetValue
              }
            </p>
          </div>
        )
      })
    }
  }
  return (
    <div className="query-cat-container">
      <h2 className="query-cat-container__title">Popular Searches</h2>
      <div className="query-cat-container__search">
        <Glass />
        <p>{query}</p>
      </div>
      <div className="query-cat-container__result">
        {type === 'ambiguous' ? (
          <p>{renderAmbiguous(categoryAmbiguous)}</p>
        ) : (
          <div className="query-cat-container__result__return">
            <Return />
            <p>{category}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default QueryCat
