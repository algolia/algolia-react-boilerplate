// This is for displaying the SortBy widget, eg Price asc/desc

import { connectSortBy } from 'react-instantsearch-dom';

const SortBy = ({ refine, items }) => {
  return (
    <div>
      <select
        onChange={(event) => {
          event.preventDefault();
          refine(event.target.value);
        }}
      >
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const CustomSortBy = connectSortBy(SortBy);

export default CustomSortBy;
