import { useState } from 'react';

import { Configure, Index, useHits } from 'react-instantsearch-hooks-web';

// React Router
import { useNavigate } from 'react-router-dom';

// Recoil
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';

// Import configuration
import { mainIndex } from '@/config/algoliaEnvConfig';
import { hitsPerCarousel } from '@/config/carouselConfig';
import { hitAtom, hitsConfig } from '@/config/hitsConfig';
import { personaSelectedAtom } from '@/config/personaConfig';
import { segmentSelectedAtom } from '@/config/segmentConfig';
import { isCarouselLoaded } from '@/config/carouselConfig';

// In case of img loading error
import * as placeHolderError from '@/assets/logo/logo.webp';

import get from 'lodash/get';

// import Price component
import Price from '@/components/hits/components/Price.jsx';
import { windowSize } from '@/hooks/useScreenSize';

//Import scope SCSS
import './SCSS/carousels.scss';
import CustomSkeleton from '../skeletons/CustomSkeleton';

// Build the Carousel for use on the Homepage
const HomeCarousel = ({ context, title }) => {
  const index = useRecoilValue(mainIndex);
  const userToken = useRecoilValue(personaSelectedAtom);
  const segmentOptionalFilters = useRecoilValue(segmentSelectedAtom);
  const carouselLoaded = useRecoilValue(isCarouselLoaded);

  const { mobile } = useRecoilValue(windowSize);

  return (
    <div className={`${mobile ? 'home-carousel-mobile' : 'home-carousel'}`}>
      <Index indexId={title} indexName={index}>
        <Configure
          hitsPerPage={hitsPerCarousel}
          ruleContexts={context}
          optionalFilters={segmentOptionalFilters}
          userToken={userToken}
          query={''}
        />

        <Carousel title={title} />
      </Index>
    </div>
  );
};

// This carousel is used inside of HomeCarousel

function Carousel(props) {
  const { hits } = useHits(props);
  const { title } = props;
  const [carouselLoaded, setIsCarouselLoaded] =
    useRecoilState(isCarouselLoaded);

  // Navigate is used by React Router
  const navigate = useNavigate();

  // Hits are imported by Recoil
  const hitState = useSetRecoilState(hitAtom);
  const { objectID, image, productName, brand } = hitsConfig;

  return (
    <>
      <h3 className="title">{title}</h3>
      {/* This div declares the outer reference for the framer motion */}
      <div className="carousel">
        {carouselLoaded === false && <CustomSkeleton type="hit" />}
        <div className="inner-carousel">
          {/* Display the hits in the carousel */}
          {hits.map((hit, i) => {
            return (
              <div key={i} className="item">
                <div className="carousel__imageWrapper">
                  <img
                    src={get(hit, image)}
                    alt={get(hit, productName)}
                    onError={(e) => (e.currentTarget.src = placeHolderError)}
                    width="400"
                    height="577"
                    onLoad={() => setIsCarouselLoaded(true)}
                  />
                </div>
                <div
                  className="item__infos"
                  onClick={() => {
                    hitState(hit);
                    // navigate to the product show page
                    navigate(`/search/${hit[objectID]}`);
                  }}
                >
                  <div className="item__infosUp">
                    <p className="brand">{get(hit, brand)}</p>
                    <h3 className="productName">{get(hit, productName)}</h3>
                  </div>
                  <p className="price">
                    <Price hit={hit} />
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default HomeCarousel;
