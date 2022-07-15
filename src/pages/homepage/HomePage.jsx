// This is the homepage, which you see when you first visit the site.
// By default it contains some banners and carousels
import { useState } from 'react';

import { lazy, Suspense, useEffect, useRef } from 'react';

// recoil import
import { useRecoilValue } from 'recoil';

// Import screenShot/ images for the homepage
import homepage_1 from '@/assets/homepage/homepage_1.webp';
import homepage_2 from '@/assets/homepage/homepage_2.webp';

import { mainIndex } from '@/config/algoliaEnvConfig';
import { framerMotionPage } from '@/config/animationConfig';

// should carousel be shown or not and config for carousel
import { carouselConfig } from '@/config/carouselConfig';

//  should federated search be shown or not
import {
  shouldHaveCarousels,
  shouldHaveFederatedSearch,
  shouldHaveTrendingProducts,
} from '@/config/featuresConfig';
import { shouldHaveOpenFederatedSearch } from '@/config/federatedConfig';
import CustomSkeleton from '@/components/skeletons/CustomSkeleton';

// components import
// const CustomHomeBanners = lazy(() =>
//   import('@/components/banners/HomeBanners')
// );
import CustomHomeBanners from '@/components/banners/HomeBanners';

const FederatedSearch = lazy(() =>
  import('@/components/federatedSearch/FederatedSearch')
);

const HomeCarousel = lazy(() => import('@/components/carousels/HomeCarousel'));

const Trending = lazy(() =>
  import('@/components/recommend/trending/TrendingProducts')
);

// Import scoped SCSS
import './homepage.scss';

const HomePage = ({ setIsMounted }) => {
  // Get the main index
  const index = useRecoilValue(mainIndex);

  const [carouselLoaded, setCarouselLoaded] = useState(false);

  const [isHomepage1Loaded, setHomepage1Loaded] = useState(false);
  const [isHomepage2Loaded, setHomepage2Loaded] = useState(false);

  // Boolean value which determines if federated search is shown or not, default is false
  const isFederated = useRecoilValue(shouldHaveFederatedSearch);
  const isCarousel = useRecoilValue(shouldHaveCarousels);
  const isFederatedOpen = useRecoilValue(shouldHaveOpenFederatedSearch);
  const HomePage = useRef(false);

  // Boolean value which determines if federated search is shown or not, default is false
  const shouldHaveTrendingProductsValue = useRecoilValue(
    shouldHaveTrendingProducts
  );

  useEffect(() => {
    HomePage.current = true;
    setIsMounted(HomePage.current);
    return () => {
      HomePage.current = false;
      setIsMounted(HomePage.current);
    };
  }, []);

  return (
    // Framer motion wrapper
    <div className="homepage" ref={HomePage}>
      {isFederated && isFederatedOpen && (
        <Suspense>
          <FederatedSearch />
        </Suspense>
      )}
      {/* Load custom banners */}
      {/* <Suspense> */}
      <CustomHomeBanners />
      {/* </Suspense> */}

      {isCarousel &&
        carouselConfig.map((carousel, i) => (
          <Suspense key={i}>
            <HomeCarousel
              context={carousel.context}
              title={carousel.title}
              setCarouselLoaded={setCarouselLoaded}
              carouselLoaded={carouselLoaded}
            />
          </Suspense>
        ))}

      {/* Render Recommend component - Trending Products Slider */}
      {/* Change header and maxRecommendations in /config/trendingConfig.js */}
      {carouselLoaded && (
        <div className="recommend">
          {shouldHaveTrendingProductsValue && (
            <Suspense>
              <Trending filter={null} />
            </Suspense>
          )}
        </div>
      )}

      {homepage_1 && carouselLoaded && (
        <div className="homepage__imageWrapper">
          {isHomepage1Loaded === false && <CustomSkeleton type="banner" />}
          <img
            src={homepage_1}
            alt="homepage1"
            width="3014"
            height="1324"
            onLoad={() => setHomepage1Loaded(true)}
          />
        </div>
      )}

      {homepage_2 && carouselLoaded && (
        <div className="homepage__imageWrapper">
          {isHomepage2Loaded === false && <CustomSkeleton type="banner" />}
          <img
            src={homepage_2}
            alt="homepage1"
            width="3014"
            height="1324"
            onLoad={() => setHomepage2Loaded(true)}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
