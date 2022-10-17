// This is the homepage, which you see when you first visit the site.
// By default it contains some banners and carousels
import { lazy, Suspense, useRef, useState } from 'react';

// Fetch values from state
import { useRecoilValue } from 'recoil';

// Framer motion
import { AnimatePresence } from 'framer-motion';

//Use Translation
import { useTranslation } from 'react-i18next';

// Import screenShot/ images for the homepage
import homepage_1 from '@/assets/homepage/homepage_1.webp';
import homepage_2 from '@/assets/homepage/homepage_2.webp';

// should carousel be shown or not and config for carousel
import { carouselConfig } from '@/config/carouselConfig';

import CustomHomeBanners from '@/components/banners/HomeBanners';
import CustomSkeleton from '@/components/skeletons/CustomSkeleton';

//  should federated search be shown or not
import {
  shouldHaveCarousels,
  shouldHaveFederatedSearch,
  shouldHaveTrendingProducts,
} from '@/config/featuresConfig';
import { shouldHaveOpenFederatedSearch } from '@/config/federatedConfig';

import { windowSize } from '@/hooks/useScreenSize';
import usePreventScrolling from '@/hooks/usePreventScrolling';

const FederatedSearch = lazy(() =>
  import('@/components/federatedSearch/FederatedSearch')
);

const HomeCarousel = lazy(() => import('@/components/carousels/HomeCarousel'));

const Trending = lazy(() =>
  import('@/components/recommend/trending/TrendingProducts')
);
// Import scoped SCSS
import './homepage.scss';

const HomePage = () => {
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

  const { mobile } = useRecoilValue(windowSize);

  // Import and use translation
  const { t } = useTranslation('translation', {
    keyPrefix: 'homePage',
  });

  return (
    // Framer motion wrapper
    <div className="homepage" ref={HomePage}>
      {isFederated && isFederatedOpen && (
        <Suspense>
          <AnimatePresence>
            <FederatedSearch />
          </AnimatePresence>
        </Suspense>
      )}

      {/* Load custom banners */}
      <div className="landingImg">
        <img src="/static/images/landingImg.webp" alt="" id='landingImg'/>
        <img src="/static/images/imgDetail.png" alt="" />
      </div>
      <br /><br /><br /><br />
      <div className="fall-section">
        <p id='title-fall'>THE FALL WINTER 2022 COLLECTION</p>
        <p id='braket'>[2]</p>
        <div className="w-66">
          <img src="/static/images/firstFall.jpg" alt="" />
          <img src="/static/images/fall1D.jpg" alt="" />
        </div>
        <div className="w-33">
          <img src="/static/images/secondFall.jpg" alt="" />
          <img src="/static/images/fall2D.jpg" alt="" />
        </div>
      </div>

      {isCarousel &&
        carouselConfig.map((carousel, i) => (
          <HomeCarousel
            key={i}
            context={carousel.context}
            title={t('titleCarousels')[i]}
          />
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
            width={mobile ? '400' : '3014'}
            height={mobile ? '202' : '1324'}
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
