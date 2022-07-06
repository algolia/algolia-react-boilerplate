// This SearchBox is with a magnifying glass inside
// but simple it means with only a glass simple effect

import { memo, useState } from 'react';

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
  searchBoxIsActive,
} from '@/config/searchboxConfig';

import { shouldHaveOpenFederatedSearch } from '@/config/federatedConfig';

// Custom Hooks
import useStoreQueryToLocalStorage from '@/hooks/useStoreStringToLocalStorage';
import useOutsideClick from '@/hooks/useOutsideClick';
//Import scope SCSS
import './SCSS/searchbox.scss';

function CustomSearchBox(props) {
  const { query } = useSearchBox(props);

  // Recoil State
  const [queryState, setQueryState] = useRecoilState(queryAtom);
  const [sbIsActive, setSbIsActive] = useRecoilState(searchBoxIsActive);
  // const setSearchBoxRef = useSetRecoilState(searchBoxAtom);
  const [simplePlaceholder] = useRecoilState(simplePlaceholderAtom);
  const setIsFederatedOpen = useSetRecoilState(shouldHaveOpenFederatedSearch);

  // router hook to navigate using a function
  const navigate = useNavigate();
  // Get states of React Router
  const { state } = useLocation();

  // Get array of rules from Recoil
  const rulesApplied = useSetRecoilState(rulesAtom);

  const refineFunction = (query) => {
    // Empty array of rules on each Keystrokes
    rulesApplied([]);
    // Refine query in all the app through recoil
    setQueryState(query);
  };

  return (
    <div className={sbIsActive ? 'searchbox-active searchbox' : 'searchbox'}>
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
        }}
      >
        <input
          className="searchbox__form__input"
          // ref={setSearchBoxRef}
          type="search"
          value={queryState ? queryState : ''}
          placeholder={simplePlaceholder}
          onClick={() => {
            setIsFederatedOpen(true);
            setSbIsActive(true);
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
