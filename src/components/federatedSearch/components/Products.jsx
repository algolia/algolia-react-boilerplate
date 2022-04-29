import { memo } from 'react';

// Algolia's imports
import { connectHits } from 'react-instantsearch-dom';

// Component import
import { ChevronRight } from '@/assets/svg/SvgIndex';

// Recoil import
import { hitAtom } from '@/config/hitsConfig';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { hitsConfig } from '@/config/hitsConfig';

import {
  shouldIdisplayCurrency,
  currencySymbolAtom,
} from '@/config/currencyConfig';

// React-router import
import { useNavigate } from 'react-router-dom';

import get from 'lodash/get';

const Hits = ({ hits }) => {
  const navigate = useNavigate();
  const hitState = useSetRecoilState(hitAtom);

  // Get currency symbol
  const currency = useRecoilValue(currencySymbolAtom);
  const displayCurrency = useRecoilValue(shouldIdisplayCurrency);

  // Get hit attribute from config file
  const { price, objectID, image, productName, brand } =
    useRecoilValue(hitsConfig);

  return (
    <div className="products">
      <div className="products__header">
        <h3 className="products__title">Products</h3>
      </div>
      <ul className="products__items">
        {hits.length ? (
          hits.map((hit) => {
            return (
              <li
                key={hit[objectID]}
                className="products__item"
                onClick={() => {
                  hitState(hit);
                  navigate(`/search/${hit[objectID]}`);
                }}
              >
                <div className="image-wrapper">
                  <img src={get(hit, image)} alt="" />
                </div>
                <div className="infos">
                  <p className="brand">{get(hit, brand)}</p>
                  <p className="name">{get(hit, productName)}</p>
                  <p className="price">
                    {get(hit, price)}
                    {displayCurrency && currency}
                  </p>
                </div>
              </li>
            );
          })
        ) : (
          <span className="no-results__infos">No Results Found</span>
        )}
      </ul>
      <div className="products__btn" onClick={() => {}}>
        <ChevronRight />
        <p onClick={() => navigate('/search')}>SHOW ALL PRODUCTS</p>
      </div>
    </div>
  );
};

const Products = connectHits(Hits);

export default memo(Products);
