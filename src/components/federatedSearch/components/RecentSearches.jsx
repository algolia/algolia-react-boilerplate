import { memo } from 'react';

// components import
import { ChevronRight } from '@/assets/svg/SvgIndex';

import { useNavigate, createSearchParams } from 'react-router-dom';

// recoil import
import { useSetRecoilState } from 'recoil';
import { queryAtom } from '@/config/searchboxConfig';

const RecentSearches = memo(() => {
  const getSearches = localStorage.getItem('recentSearches');
  const cleanSearches = JSON.parse(getSearches);
  // router hook to navigate using a function
  const navigate = useNavigate();
  // update query in searchBar
  const setQueryState = useSetRecoilState(queryAtom);

  if (cleanSearches && cleanSearches.length !== 0) {
    return (
      <div className="recentSearches">
        <h3 className="recentSearches__title">Recent Searches</h3>
        <ul className="recentSearches__items">
          {cleanSearches
            .reverse()
            .splice(0, 3)
            .map((search, index) => {
              return (
                <li
                  onClick={() => {
                    navigate({
                      pathname: '/search',
                      search: `?${createSearchParams({ query: search })}`,
                    });
                    setQueryState(search);
                  }}
                  key={index}
                >
                  <ChevronRight />
                  <p>{search}</p>
                </li>
              );
            })}
        </ul>
      </div>
    );
  } else {
    return null;
  }
});

export default RecentSearches;
