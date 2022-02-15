import React from 'react';

// Algolia's imports
import { connectHits } from 'react-instantsearch-dom';

// Component import
import { ChevronRight } from '../../../assets/svg/SvgIndex';

// Recoil import
import { hitAtom } from '../../../config/results';
import { useSetRecoilState } from 'recoil';

// React-router import
import { useNavigate } from 'react-router-dom';

const Hits = ({ hits }) => {
  const navigate = useNavigate();
  const hitState = useSetRecoilState(hitAtom);
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
              onClick={() => {
                hitState(hit);
                navigate(`/search/${hit.objectID}`);
              }}
            >
              <div className="image-wrapper">
                <img src={hit.full_url_image} alt="" />
              </div>
              <div className="infos">
                <p className="brand">{hit.brand}</p>
                <p className="name">{hit.name}</p>
                <p className="price">{hit.price}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="products__btn" onClick={() => {}}>
        <ChevronRight />
        <p>SHOW ALL PRODUCTS</p>
      </div>
    </div>
  );
};

const Products = connectHits(Hits);

export default React.memo(Products);
