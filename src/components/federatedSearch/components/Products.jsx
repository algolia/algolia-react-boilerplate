import React from 'react';

// Algolia's imports
import { connectHits } from 'react-instantsearch-dom';

const Hits = ({ hits }) => {
  console.log('Hits called');
  return (
    <div className="products">
      <div className="products__header">
        <h3 className="products__title">Products</h3>
      </div>
      <ul className="products__items">
        {hits.map((hit) => {
          return (
            <li
              key={hit.objectID}
              className="products__item"
              onClick={(e) => {}}
            >
              <p>{hit.name}</p>
            </li>
          );
        })}
      </ul>
      <div className="products__btn" onClick={() => {}}>
        <p>SHOW ALL PRODUCTS</p>
      </div>
    </div>
  );
};

const Products = connectHits(Hits);

export default React.memo(Products);
