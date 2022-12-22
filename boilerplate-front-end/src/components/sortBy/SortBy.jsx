// This is for displaying the SortBy widget, eg Price asc/desc
import { useSortBy } from 'react-instantsearch-hooks-web'

function CustomSortBy(props) {
  const { refine } = useSortBy(props)
  const { items } = props
  return (
    <div>
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
