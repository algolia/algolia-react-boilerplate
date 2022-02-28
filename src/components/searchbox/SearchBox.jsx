// This SearchBox is with a glass inside
// but simple it means with only a glass simple effect
// Import Debounce
import debounce from 'lodash.debounce';
import React, { useCallback, memo, useMemo, useEffect } from 'react';
// Algolia Import
import { connectSearchBox } from 'react-instantsearch-dom';
// Import navigate function to route to results page on search submit
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
// Import Recoil
import { useRecoilState, useSetRecoilState } from 'recoil';

// Import SVG from file as a component
// eslint-disable-next-line import/namespace
import { Glass } from '../../assets/svg/SvgIndex';
import SearchInCategory from './components/SearchInCategory';
// Import Config for recoil from file as a component
import { isFederatedAtom, searchBoxAtom } from '../../config/config';
import {
  queryAtom,
  simplePlaceholderAtom,
  SearchInCategoryConfig,
} from '../../config/searchbox';

// Custom Hooks
import useStoreQueryToLocalStorage from '../../hooks/useStoreStringToLocalStorage';

const SearchBoxSimple = ({ refine, currentRefinement }) => {
  // Recoil State
  const [queryState, setQueryState] = useRecoilState(queryAtom);
  const setSearchBoxRef = useSetRecoilState(searchBoxAtom);
  const [simplePlaceholder] = useRecoilState(simplePlaceholderAtom);
  const setIsFederated = useSetRecoilState(isFederatedAtom);
  // router hook to navigate using a function
  const navigate = useNavigate();
  // Get states of React Router
  const { state } = useLocation();

  const refineFunction = (query) => {
    console.log(query);
    setQueryState(query);
    refine(query);
  };

  useEffect(() => {
    return () => {
      // Remove side effect
      debouncedRefine.cancel();
    };
  });

  // Debounce during search if you want to change the reactivity change number 250
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const debouncedRefine = useCallback(debounce(refineFunction, 50), []);
  const debouncedRefine = useMemo(() => {
    return debounce(refineFunction, 50);
  }, []);
  return (
    <div className="searchbox">
      <form
        className="searchbox__form"
        action=""
        role="search"
        autoComplete="off"
        onSubmit={(event) => {
          event.preventDefault();
          setQueryState(currentRefinement);
          useStoreQueryToLocalStorage(currentRefinement);
          navigate('/search');
        }}
      >
        <input
          className="searchbox__form__input"
          ref={setSearchBoxRef}
          type="search"
          value={queryState ? queryState : ''}
          placeholder={simplePlaceholder}
          onClick={() => setIsFederated(true)}
          onChange={(event) => {
            refineFunction(event.currentTarget.value);
          }}
        />
        {state && SearchInCategoryConfig.isSearchInCategory && (
          <SearchInCategory state={state} />
        )}
        <Glass />
      </form>
    </div>
  );
};

const CustomSearchBoxSimple = connectSearchBox(SearchBoxSimple);

export default memo(CustomSearchBoxSimple);
