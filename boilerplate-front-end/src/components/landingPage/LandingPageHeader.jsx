// This builds a header including a banner, a title and extra text
// It is is expected to be rendered in the search results page
// The queryRuleCustomData widget displays custom data from Rules.
// You use this widget to display banners or recommendations returned by Rules, and that match search parameters.
// You can find the expected rule response by looking at Landing Pages in the Readme
import { useQueryRules } from 'react-instantsearch-hooks-web'

// SCSS import
import './SCSS/landing-page-header.scss'

// Builds a banner, title and text for a landing page format SRP
function LandingPageHeader(props) {
  const { items } = useQueryRules(props)
  return (
    <div>
      {items.map((item) => {
        return (
          item.type === 'LandingPageHeader' && (
            <>
              <div
                key={item.title}
                className="banner"
                // NB Inline style is necessary here due to how background images work
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.62), rgba(0, 0, 0, 0.45)), url(${item.banner})`,
                }}
              ></div>
              <div className="title-wrapper">
                <h3 className="title">{item.title}</h3>
              </div>
              <div className="text-wrapper">
                <p className="text">{item.text}</p>
              </div>
            </>
          )
        )
      })}
    </div>
  )
}

export default LandingPageHeader
