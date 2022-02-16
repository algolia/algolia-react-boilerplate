import React from 'react';

// Import components
import { ChevronLeft } from '../assets/svg/SvgIndex';

// React router import
import { useNavigate } from 'react-router-dom';

// Recoil import
import { useRecoilValue } from 'recoil';
import { hitAtom } from '../config/results';

const ProductDetails = () => {
  const hit = useRecoilValue(hitAtom);
  const navigate = useNavigate();
  return (
    <div className="pdp">
      <div className="pdp__wrapper">
        <div className="pdp__backBtn" onClick={() => navigate(-1)}>
          <ChevronLeft />
          <p>Back to search</p>
        </div>
        <div className="pdp__left">
          <div className="imageWrapper">
            <img src={hit.full_url_image} alt="" />
          </div>
        </div>
        <div className="pdp__right">
          <div className="pdp__right__infos">
            <p className="brand">{hit.brand}</p>
            <p className="name">{hit.name}</p>
            <p className="color">{hit.colour}</p>
            <div className="sizes">
              <p>Available size(s):</p>
              <div className="sizeList">
                {hit.sizeFilter.map((size) => (
                  <div className="size">
                    <p>{size}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="price">{hit.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
