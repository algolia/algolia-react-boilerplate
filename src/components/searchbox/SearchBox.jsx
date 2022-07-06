// This SearchBox is with a magnifying glass inside
// but simple it means with only a glass simple effect

import { memo, useState, useEffect } from 'react';

// Algolia Import
import { useSearchBox } from 'react-instantsearch-hooks-web';

// Import navigate function to route to results page on search submit
import { useLocation, useNavigate } from 'react-router-dom';

// Import Recoil
import { useRecoilState, useSetRecoilState } from 'recoil';

// Import SVG from file as a component
import { Glass } from '@/assets/svg/SvgIndex';
import SearchInCategory from './components/SearchInCategory';

import { rulesAtom } from '@/config/appliedRulesConfig';
import {
  isSearchInCategory,
  queryAtom,
  searchBoxAtom,
  simplePlaceholderAtom,
} from '@/config/searchboxConfig';

import { shouldHaveOpenFederatedSearch } from '@/config/federatedConfig';

// Custom Hooks
import useStoreQueryToLocalStorage from '@/hooks/useStoreStringToLocalStorage';
import useOutsideClick from '@/hooks/useOutsideClick';
//Import scope SCSS
import './SCSS/searchbox.scss';

function CustomSearchBox(props) {
  const { refine, query } = useSearchBox(props);
  // Recoil State
  const [queryState, setQueryState] = useRecoilState(queryAtom);
  const [searchboxIsActive, setSearchboxIsActive] = useState(false);
  const [searchboxRef, setSearchBoxRef] = useRecoilState(searchBoxAtom);
  const [simplePlaceholder] = useRecoilState(simplePlaceholderAtom);
  const setIsFederatedOpen = useSetRecoilState(shouldHaveOpenFederatedSearch);

  // Query changed for suggestions in no results
  const { queryChanged } = props;

  // LEFT IN FOR REFACTO PURPOSES
  // const setUnderlineCategory = useSetRecoilState(categorySelectionAtom);
  // router hook to navigate using a function
  const navigate = useNavigate();
  // Get states of React Router
  const { state } = useLocation();

  useOutsideClick(searchboxRef, () => setSearchboxIsActive(false));

  // Get array of rules from Recoil
  const rulesApplied = useSetRecoilState(rulesAtom);

  const refineFunction = (query) => {
    // Empty array of rules on each Keystrokes
    rulesApplied([]);
    setQueryState(query);
    refine(query);
  };

  useEffect(() => {
    refine(queryState);
  }, [queryState]);

  return (
    <div
      // Comment it because we don't use it anymore
      className={`searchbox ${state?.type ? ' searchboxCategory' : ''} ${
        searchboxIsActive ? 'searchbox-active' : ''
      }`}
    >
      <form
        className="searchbox__form"
        action=""
        role="search"
        autoComplete="off"
        onSubmit={(event) => {
          event.preventDefault();
          setQueryState(query);
          useStoreQueryToLocalStorage(query);
          navigate('/search');
          // set the Navigation category to 'All', which is at index 0
          // LEFT IN FOR REFACTO PURPOSES
          // setUnderlineCategory(0);
        }}
      >
        <input
          className="searchbox__form__input"
          ref={setSearchBoxRef}
          type="search"
          value={queryState ? queryState : ''}
          placeholder={simplePlaceholder}
          onClick={() => {
            setIsFederatedOpen(true);
            setSearchboxIsActive(true);
          }}
          onChange={(event) => {
            refineFunction(event.currentTarget.value);
          }}
        />
        {state && isSearchInCategory && <SearchInCategory state={state} />}
        <Glass />
      </form>
    </div>
  );
}

export default memo(CustomSearchBox);
