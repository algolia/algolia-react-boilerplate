import React from 'react';

const SearchInCategory = ({ state }) => (
  <div className="searchbox-simple__category">
    <p>Search in {state.split(':')[1].split('>').pop().slice(0, -1)}</p>
  </div>
);

export default SearchInCategory;
