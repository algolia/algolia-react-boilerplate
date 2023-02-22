import { Glass, Return } from '@/assets/svg/SvgIndex'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Import recoil state for navigation
import { navigationStateAtom } from '@/config/navigationConfig'
import { useSetRecoilState } from 'recoil'
import { probabilityToShowQueryCat } from '@/config/federatedConfig'

const QueryCat = ({
  queryCategorization,
  query,
  setProbability,
  probability,
}) => {
  // Define a type variable to check if the query is ambiguous or not
  const type = queryCategorization.type
  // Set states
  const [category, setCategory] = useState(null)
  const [categoryAmbiguous, setCategoryAmbiguous] = useState([])
  const [facetName, setFacetName] = useState(null)

  // Import the state from recoil and navigation function
  const setNavigationState = useSetRecoilState(navigationStateAtom)

  // Get the probability
  const probabilityValue = useRecoilValue(probabilityToShowQueryCat)

  // router hook to navigate using a function
  const navigate = useNavigate()

  // Slugify function
  const slugify = (label) => {
    const slug = label.replace(/>/g, '-').split(' ').join('')
    return slug
  }

  // Set the state of the category in case the query is not ambiguous or not
  useEffect(() => {
    if (type === 'ambiguous') {
      setCategoryAmbiguous(queryCategorization?.categories)
    } else {
      // Set the category state
      setCategory(
        queryCategorization?.categories[0]?.hierarchyPath[
          queryCategorization?.categories[0]?.hierarchyPath.length - 1
        ].facetValue
      )
      // Set the probability state
      setProbability(queryCategorization?.categories[0].probability)
      // Set the facetName state
      setFacetName(
        queryCategorization?.categories[0]?.hierarchyPath[
          queryCategorization?.categories[0]?.hierarchyPath.length - 1
        ].facetName
      )
    }
  }, [queryCategorization])

  // If the category is ambiguous, render the list of categories
  const renderAmbiguous = (categoryAmbiguous) => {
    {
      return categoryAmbiguous.map((category) => {
        if (category.probability > probabilityValue) {
          setProbability(category.probability)
          return (
            <div className="query-cat-container__result__return">
              <Return />
              <p
                onClick={() => {
                  navigate(
                    `/search/${slugify(
                      category?.hierarchyPath[category.hierarchyPath.length - 1]
                        .facetValue
                    )}`
                  )
                  setNavigationState({
                    type: 'filter',
                    name: category?.hierarchyPath[
                      category.hierarchyPath.length - 1
                    ].facetValue
                      .split('>')
                      .pop(),
                    value: `${
                      category?.hierarchyPath[category.hierarchyPath.length - 1]
                        .facetName
                    }:"${
                      category?.hierarchyPath[category.hierarchyPath.length - 1]
                        .facetValue
                    }"`,
                  })
                }}
              >
                {
                  category?.hierarchyPath[category.hierarchyPath.length - 1]
                    .facetValue
                }
              </p>
            </div>
          )
        }
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
            <p
              onClick={() => {
                navigate(`/search/${slugify(category)}`)
                setNavigationState({
                  type: 'filter',
                  name: category.split('>').pop(),
                  value: `${facetName}:"${category}"`,
                })
              }}
            >
              {category}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default QueryCat
