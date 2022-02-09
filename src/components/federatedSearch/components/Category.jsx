import React from "react";

// Algolia's imports
import { connectRefinementList } from "react-instantsearch-dom";

const CategoryItems = ({ items, refine }) => {
  return (
    <ul>
      {items.map((hit) => (
        <li key={hit.label} onClick={() => {}}>
          <p>{hit.label.split(">").pop()}</p>
        </li>
      ))}
    </ul>
  );
};

const Category = connectRefinementList(CategoryItems);

export default Category;
