// This SearchBox is with a magnifying glass inside
// but simple it means with only a glass simple effect

import { memo, useRef } from 'react';

// Algolia Import
import { useSearchBox } from 'react-instantsearch-hooks-web';

// Import navigate function to route to results page on search submit
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

// Import Recoil
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

// Import SVG from file as a component
import { Glass } from '@/assets/svg/SvgIndex';
import SearchInCategory from './components/SearchInCategory';

import { rulesAtom } from '@/config/appliedRulesConfig';
import {
  isSearchInCategory,
  queryAtom,
  searchBoxIsActive,
} from '@/config/searchboxConfig';

import { navigationStateAtom } from '@/config/navigationConfig';

import { shouldHaveOpenFederatedSearch } from '@/config/federatedConfig';

//Use Translation
import { useTranslation } from 'react-i18next';

import { debounce } from 'lodash';

// Custom Hooks
import useStoreQueryToLocalStorage from '@/hooks/useStoreStringToLocalStorage';

//Import scope SCSS
import './SCSS/searchbox.scss';

function CustomSearchBox(props) {
  const navigationState = useRecoilValue(navigationStateAtom);
  // Handle URL search parameters through React Router
  let [searchParams, setSearchParams] = useSearchParams();

  const { query } = useSearchBox(props);

  // Recoil State
  const [queryState, setQueryState] = useRecoilState(queryAtom);
  const [sbIsActive, setSbIsActive] = useRecoilState(searchBoxIsActive);
  // const setSearchBoxRef = useSetRecoilState(searchBoxAtom);
  const setIsFederatedOpen = useSetRecoilState(shouldHaveOpenFederatedSearch);

  // router hook to navigate using a function
  const navigate = useNavigate();
  // Get states of React Router
  const { state } = useLocation();

  // Get array of rules from Recoil
  const rulesApplied = useSetRecoilState(rulesAtom);

  // Import and use translation
  const { t } = useTranslation('translation', {
    keyPrefix: 'searchBox',
  });

  const debouncedSetQueryParams = useRef(
    debounce((query) => {
    // Update the query URL param to the value of the new search
    searchParams.set('query', query)
    setSearchParams(searchParams)
    }, 500)
  ).current;

  const refineFunction = (query) => {
    // Empty array of rules on each Keystrokes
    rulesApplied([]);

    debouncedSetQueryParams(query)
    // Refine query in all the app through recoil
    setQueryState(query);
  };

  return (
    <div
      className={`searchbox ${sbIsActive ? 'searchbox-active' : ''} ${
        state && isSearchInCategory ? 'searchbox-category' : ''
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

          navigate(
            { 
              pathname: "/search",
              search: `?${searchParams}`,
            }
          )
        }}
      >
        <input
          className="searchbox__form__input"
          // ref={setSearchBoxRef}
          type="search"
          value={queryState ? queryState : ''}
          placeholder={t('placeHolder')}
          onClick={() => {
            setIsFederatedOpen(true);
            setSbIsActive(true);
          }}
          onChange={(event) => {
            refineFunction(event.currentTarget.value);
          }}
        />
        {navigationState && isSearchInCategory && <SearchInCategory state={state} />}
        <Glass />
      </form>
    </div>
  );
}

export default memo(CustomSearchBox);
