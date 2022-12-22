import { memo } from 'react'

// Algolia's imports
import { useHits, Highlight } from 'react-instantsearch-hooks-web'

// Component import
import { ChevronRight } from '@/assets/svg/SvgIndex'
import Price from '@/components/hits/components/Price.jsx'

// Recoil import
import { hitAtom, hitsConfig } from '@/config/hitsConfig'
import { personaObjectSelectedAtom } from '@/config/personaConfig'
import { useRecoilValue, useSetRecoilState } from 'recoil'

// React-router import
import { useNavigate } from 'react-router-dom'

import get from 'lodash/get'

function Products({ query, refine }, props) {
  const { hits } = useHits(props)
  const navigate = useNavigate()
  const hitState = useSetRecoilState(hitAtom)

  const persona = useRecoilValue(personaObjectSelectedAtom)

  //Get title, props
  const { products, productsBefore, buttonShowAll, noResults } = props
  // Get hit attribute from config file
  const { objectID, image, productName, brand } = hitsConfig

  return (
    <div className="products">
      <div className="products__header">
        {persona.value !== 'anon' && query === '' ? (
          <h3 className="products__title">{productsBefore}</h3>
        ) : (
          <h3 className="products__title">{products}</h3>
        )}
      </div>
      <ul className="products__items">
        {hits.length ? (
          hits.map((hit) => {
            return (
              <li key={hit[objectID]} className="products__item">
                <div
                  className="image-wrapper"
                  onClick={() => {
                    hitState(hit)
                    navigate(`/search/product/${hit[objectID]}`)
                  }}
                >
                  <img
                    src={get(hit, image)}
                    loading="lazy"
                    alt={get(hit, productName)}
                  />
                </div>
                <div className="infos">
                  <p className="brand">{get(hit, brand)}</p>
                  <p className="productName">
                    <Highlight hit={hit} attribute={productName} />
                  </p>
                  <p className="price">
                    <Price hit={hit} />
                  </p>
                </div>
              </li>
            )
          })
        ) : (
          <span className="no-results__infos">{noResults}</span>
        )}
      </ul>
      <div className="products__btn" onClick={() => {}}>
        <ChevronRight />
        <p onClick={() => navigate('/search')}>{buttonShowAll}</p>
      </div>
    </div>
  )
}

export default memo(Products)
