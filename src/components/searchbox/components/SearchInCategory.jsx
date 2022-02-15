import React from 'react';

const SearchInCategory = ({ state }) => (
  <div className="searchbox__category">
    <p>
      Search in{' '}
      {state.split(':')[1].split('>').pop().replace("'", '').slice(0, -1)}
    </p>
  </div>
);

export default SearchInCategory;
