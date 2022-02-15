import React from 'react';

import { connectCurrentRefinements } from 'react-instantsearch-dom';

const ClearRefinements = ({ items, refine }) => {
  const number = items.length;
  if (number) {
    return (
      <button
        className="button-clear-refinement"
        onClick={() => refine(items)}
        disabled={!items.length}
      >
        Clear all refinements
      </button>
    );
  } else {
    return '';
  }
};

const CustomClearRefinements = connectCurrentRefinements(ClearRefinements);

export default CustomClearRefinements;
