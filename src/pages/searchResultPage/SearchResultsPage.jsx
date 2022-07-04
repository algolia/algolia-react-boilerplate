// Page for displaying search results
// Includes functionality for banners, query suggestions, noresults
// It also renders different search results components depending on screen size

// import React functionality
import { useEffect, useRef, useState } from 'react';

// Recoil state to directly access results
import { useSetRecoilState } from 'recoil';

// Import Components
import { NoResultsHandler } from '@/components/searchresultpage/srpLaptop/Noresult';

// Federated congif from recoil
import { shouldHaveOpenFederatedSearch } from '@/config/federatedConfig';

const SearchResultPage = ({ setIsMounted }) => {
  const [srpIsLoaded, setSrpIsLoaded] = useState(false);
  // Close federated and set value false for return without it
  const setFederatedOpen = useSetRecoilState(shouldHaveOpenFederatedSearch);

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
    const onPageLoad = () => {
      setUseSkeleton(false);
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

  return (
    <div ref={srpMounted} className="srp">
      <NoResultsHandler
        srpIsLoaded={srpIsLoaded}
        setSrpIsLoaded={setSrpIsLoaded}
      />
    </div>
  );
};

export default SearchResultPage;
