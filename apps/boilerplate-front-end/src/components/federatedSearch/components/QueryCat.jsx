import { Glass, Return } from '@/assets/svg/SvgIndex'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Import recoil state for navigation
import { navigationStateAtom } from '@/config/navigationConfig'
import { useSetRecoilState } from 'recoil'
import { probabilityToShowQueryCat } from '@/config/federatedConfig'
import { useRecoilValue } from 'recoil'

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
  const [ambiguousHigherProba, setAmbiguousHigherProba] = useState([])
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
    // if the query result in an ambiguous query cat
    if (type === 'ambiguous') {
      setCategoryAmbiguous(queryCategorization?.categories)
      // Filter the categories with a probability higher than the probability value
      // And define it in a const
      const sortArray = categoryAmbiguous.sort(
        (a, b) => b.probability - a.probability
      )
      // Set those with probability higher than the probability value
      const arrayWithProbSupValue = sortArray.filter(
        (obj) => obj.probability > probabilityValue
      )
      // in a new array in the state
      setAmbiguousHigherProba(arrayWithProbSupValue)
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

  // If the probability is higher than 0.6 and the type is not ambiguous
  if (probability > 0.6 && type !== 'ambiguous') {
    return (
      <section className="query-cat-container">
        <h2 className="query-cat-container__title">Popular Searches</h2>
        <div className="query-cat-container__search">
          <Glass />
          <p>{query}</p>
        </div>
        <div className="query-cat-container__result">
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
        </div>
      </section>
    )
  }
  // If the probability is higher than 0.6 and the type is ambiguous
  if (type === 'ambiguous' && ambiguousHigherProba.length > 0) {
    return (
      <div className="query-cat-container">
        <h2 className="query-cat-container__title">Popular Searches</h2>
        <div className="query-cat-container__search">
          <Glass />
          <p>{query}</p>
        </div>
        <div className="query-cat-container__result">
          <p>{renderAmbiguous(ambiguousHigherProba)}</p>
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default QueryCat
