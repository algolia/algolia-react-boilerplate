// Page for displaying search results
// Includes functionality for banners, query suggestions, noresults
// It also renders different search results components depending on screen size

// import React functionality
import { useEffect, useRef, useState } from 'react';

// import IS hook
import { useHits } from 'react-instantsearch-hooks-web';

// Recoil state to directly access results
import { useSetRecoilState, useRecoilValue } from 'recoil';

// Import Components
import SrpLaptop from '@/components/searchresultpage/srpLaptop/SrpLaptop';
import { NoResults } from '@/components/searchresultpage/srpLaptop/Noresult';
import Banner from '@/components/banners/Banner';

// Federated congif from recoil
import { shouldHaveOpenFederatedSearch } from '@/config/federatedConfig';
import { shouldHaveInjectedBanners } from '@/config/featuresConfig';

const SearchResultPage = ({ setIsMounted, props }) => {
  const [pageReady, setPageReady] = useState(false);
  const [nbOfHits, setNbOfHits] = useState(1);

  // Do you want to show banner on SRP? This boolean tells us yes or no
  const shouldDisplayBanners = useRecoilValue(shouldHaveInjectedBanners);

  // Close federated and set value false for return without it
  const setFederatedOpen = useSetRecoilState(shouldHaveOpenFederatedSearch);

  // import IS hook
  const { hits } = useHits(props);

  useEffect(() => {
    setFederatedOpen(false);
  }, []);

  // Handle screen resize
  const srpMounted = useRef(false);
  useEffect(() => {
    srpMounted.current = true;
    setIsMounted(srpMounted.current);
    return () => {
      srpMounted.current = false;
      setIsMounted(srpMounted.current);
    };
  }, []);

  const [useSkeleton, setUseSkeleton] = useState(true);

  // This will run one time after the component mounts
  useEffect(() => {
    const onPageLoad = (e) => {
      setUseSkeleton(false);
      setPageReady(true);
    };

    // Check if the page has already loaded
    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener('load', onPageLoad);
    }
  }, []);

  useEffect(() => {
    setNbOfHits(hits.length);
  }, [hits]);

  return (
    <>
      {nbOfHits === 0 && pageReady ? (
        <NoResults />
      ) : (
        <>
          {shouldDisplayBanners && <Banner />}
          <SrpLaptop />
        </>
      )}
    </>
  );
};

export default SearchResultPage;
