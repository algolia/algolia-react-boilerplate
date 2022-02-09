import React from "react";

// Algolia's imports
import { connectRefinementList } from "react-instantsearch-dom";

const CategoryItems = ({ items, refine }) => {
  console.log("CategoryItems called");
  return (
    <div className="categories">
      <h3 className="categories__title">Categories</h3>
      <div className="categories__wrapper">
        <div className="categories__item">
          <ul>
            {items.map((hit) => (
              <li key={hit.label} onClick={() => {}}>
                <p>{hit.label.split(">").pop()}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Category = connectRefinementList(CategoryItems);

export default React.memo(Category);
