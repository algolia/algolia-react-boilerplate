import { memo } from 'react';

// Import the Select widget (https://react-select.com/home)
import Select from 'react-select';

// Import Recoil for state management
import { useSetRecoilState } from 'recoil';
import { queryAtom } from '@/config/searchboxConfig';

// Router import
import { useNavigate, createSearchParams } from 'react-router-dom';

// Import configuration
import {
  searchTermsConfig,
  styles,
  searchTermsInformations,
} from '@/config/helpedNavigation';

const SearchTerms = () => {
  // Recoil State - update query in searchBar
  const setQueryState = useSetRecoilState(queryAtom);
  // router hook to navigate using a function
  const navigate = useNavigate();
  return (
    <div className="search-terms">
      <h3>Search Terms</h3>
      <div className="search-terms__infos">
        {searchTermsInformations.map((item) => {
          return (
            <div className="search-terms__infos__titles">
              <span>{item.span}:</span>
              <p>{item.details}</p>
            </div>
          );
        })}
      </div>
      <Select
        defaultValue={searchTermsConfig}
        options={searchTermsConfig}
        styles={styles}
        placeholder="Choose"
        onChange={(e) => {
          navigate({
            pathname: '/search',
            search: `?${createSearchParams({ query: e.value })}`,
          });
          setQueryState(e.value);
        }}
      />
    </div>
  );
};

export default SearchTerms;
