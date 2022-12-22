import '@/components/hits/SCSS/skeleton.scss'

const CustomSkeleton = ({ type }) => {
  switch (type) {
    case 'hit':
      return (
        <div className="skeleton__hit">
          <div className="skeleton__hit-top"></div>
          <div className="skeleton__hit-bottom"></div>
        </div>
      )
    case 'facet':
      return (
        <div className="skeleton__facet">
          <div className="skeleton__facet-title"></div>
          <div className="skeleton__facet-text"></div>
          <div className="skeleton__facet-text"></div>
          <div className="skeleton__facet-text"></div>
          <div className="skeleton__facet-text"></div>
        </div>
      )
    case 'banner':
      return <div className="skeleton__banner"></div>
    case 'carousel':
      return <div className="skeleton__carousel"></div>
    case 'homepage':
      return <div className="skeleton__homepage"></div>
    case 'logo':
      return <div className="skeleton__logo"></div>
  }
}

export default CustomSkeleton
