import { Glass, Return } from '@/assets/svg/SvgIndex'

const QueryCat = ({ queryCategorization }) => {
  const category =
    queryCategorization?.categories[0]?.hierarchyPath[
      queryCategorization?.categories[0]?.hierarchyPath.length - 1
    ].facetValue
  return (
    <div className="query-cat-container">
      <h2 className='query-cat-container__title'>Category</h2>
      <div className="query-cat-container__search">
        <Glass />
        <p>VEST</p>
      </div>
      <div className="query-cat-container__result">
        <Return />
        <p>{category}</p>
      </div>
    </div>
  )
}

export default QueryCat
