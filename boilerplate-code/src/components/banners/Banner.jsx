// This builds the banner that is rendered in searchresultspage
// The queryRuleCustomData widget displays custom data from Rules.
// You use this widget to display banners or recommendations returned by Rules, and that match search parameters.

import { useQueryRules } from 'react-instantsearch-hooks-web'

//SCSS import
import './SCSS/banner.scss'

function Banner(props) {
  const { items } = useQueryRules(props)
  return (
    <div>
      {items.map((item) => {
        return (
          item.type === 'bannerSrp' && (
            <div
              key={item.title}
              className="banner-srp"
              // NB Inline style is necessary here due to how background images work
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.62), rgba(0, 0, 0, 0.45)), url(${item.banner})`,
              }}
            >
              <div className="banner-srp__infos">
                <h3>{item.title}</h3>
                <p>{item.content}</p>
              </div>
            </div>
          )
        )
      })}
    </div>
  )
}

export default Banner
