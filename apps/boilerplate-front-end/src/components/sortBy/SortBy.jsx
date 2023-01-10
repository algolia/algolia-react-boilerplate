// This is for displaying the SortBy widget, eg Price asc/desc
import { useSortBy } from 'react-instantsearch-hooks-web'
import './sortby.scss'

function CustomSortBy(props) {
  const { refine } = useSortBy(props)
  const { items } = props
  return (
    <div className="sort-container">
      <p className="sort-text">Sort By: </p>
      <select
        onChange={(event) => {
          event.preventDefault()
          refine(event.target.value)
        }}
      >
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CustomSortBy
