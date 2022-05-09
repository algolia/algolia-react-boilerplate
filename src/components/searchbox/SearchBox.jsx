// This SearchBox is with a magnifying glass inside
// but simple it means with only a glass simple effect

import { memo } from 'react';

// Algolia Import
import { connectSearchBox } from 'react-instantsearch-dom';

// Import navigate function to route to results page on search submit
import { useNavigate, useLocation } from 'react-router-dom';

// Import Recoil
import { useRecoilState, useSetRecoilState } from 'recoil';

// Import SVG from file as a component
import { Glass } from '@/assets/svg/SvgIndex';
import SearchInCategory from './components/SearchInCategory';

import {
  queryAtom,
  searchBoxAtom,
  simplePlaceholderAtom,
  isSearchInCategory,
} from '@/config/searchboxConfig';
import { rulesAtom } from '@/config/appliedRulesConfig';

import { shouldHaveOpenFederatedSearch } from '@/config/federatedConfig';

import { categorySelectionAtom } from '@/config/headerConfig';

// Custom Hooks
import useStoreQueryToLocalStorage from '@/hooks/useStoreStringToLocalStorage';

const SearchBoxSimple = ({ refine, currentRefinement }) => {
  // Recoil State
  const [queryState, setQueryState] = useRecoilState(queryAtom);
  const setSearchBoxRef = useSetRecoilState(searchBoxAtom);
  const [simplePlaceholder] = useRecoilState(simplePlaceholderAtom);
  const setIsFederatedOpen = useSetRecoilState(shouldHaveOpenFederatedSearch);

  // LEFT IN FOR REFACTO PURPOSES
  // const setUnderlineCategory = useSetRecoilState(categorySelectionAtom);
  // router hook to navigate using a function
  const navigate = useNavigate();
  // Get states of React Router
  const { state } = useLocation();

  // Get array of rules from Recoil
  const rulesApplied = useSetRecoilState(rulesAtom);

  const refineFunction = (query) => {
    rulesApplied([]);
    setQueryState(query);
    refine(query);
    // console.log(query);
    // Empty array of rules on each Keystrokes
  };

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
          onClick={() => setIsFederatedOpen(true)}
          onChange={(event) => {
            refineFunction(event.currentTarget.value);
          }}
        />
        {state && isSearchInCategory && <SearchInCategory state={state} />}
        <Glass />
      </form>
    </div>
  );
};

const CustomSearchBox = connectSearchBox(SearchBoxSimple);

export default memo(CustomSearchBox);
