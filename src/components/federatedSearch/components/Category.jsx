import React from 'react';

// Algolia's imports
import { connectRefinementList } from 'react-instantsearch-dom';

// component import
import { ChevronRight } from '../../../assets/svg/SvgIndex';

const CategoryItems = ({ items, refine }) => {
  return (
    <div className="categories">
      <h3 className="categories__title">Categories</h3>
      <div className="categories__wrapper">
        <ul className="categories__items">
          {items.map((hit) => (
            <li key={hit.label} onClick={() => {}}>
              <ChevronRight />
              <p>{hit.label.split('>').pop()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Category = connectRefinementList(CategoryItems);

export default React.memo(Category);
