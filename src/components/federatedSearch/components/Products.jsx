import { memo } from 'react';

// Algolia's imports
import { connectHits } from 'react-instantsearch-dom';

// Component import
import { ChevronRight } from '@/assets/svg/SvgIndex';

// Recoil import
import { hitAtom } from '@/config/results';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { hitsConfig } from '@/config/hits';

// React-router import
import { useNavigate } from 'react-router-dom';

const Hits = ({ hits }) => {
  const navigate = useNavigate();
  const hitState = useSetRecoilState(hitAtom);

  // Get hit attribute from config file
  const { price, objectID, image, productName, brand } =
    useRecoilValue(hitsConfig);
  return (
    <div className="products">
      <div className="products__header">
        <h3 className="products__title">Products</h3>
      </div>
      <ul className="products__items">
        {hits.map((hit) => {
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
                <img src={hit[image]} alt="" />
              </div>
              <div className="infos">
                <p className="brand">{hit[brand]}</p>
                <p className="name">{hit[productName]}</p>
                <p className="price">{hit[price]}</p>
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

export default memo(Products);
