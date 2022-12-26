// Render the blog post in federated search
import { memo } from 'react'

// Algolia
import { useHits } from 'react-instantsearch-hooks-web'

import { useRecoilValue } from 'recoil'

import { contentArticlesConfig } from '@/config/hitsConfig'

import get from 'lodash/get'

function Articles(props) {
  const { hits } = useHits(props)
  const { image, date, title, headings } = useRecoilValue(contentArticlesConfig)
  //get title from props
  const { titleArticles } = props

  return (
    <div className="articles__wrapper">
      <h3 className="articles__title">{titleArticles}</h3>
      {hits.map((hit, index) => {
        return (
          <div key={index} className="articles__item">
            <div className="image-wrapper">
              <img src={get(hit, image)} loading="lazy" alt="blog post image" />

              <p className="date">{get(hit, date)}</p>
              <div className="overlay"></div>
            </div>
            <div className="infos">
              <p className="title">{get(hit, title)}</p>
              <p className="subtitle">{get(hit, headings)}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default memo(Articles)
