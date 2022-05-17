import { memo } from 'react';

// Algolia's imports
import { useHits, Highlight } from 'react-instantsearch-hooks-web';

// components import
import { ChevronRight } from '@/assets/svg/SvgIndex';

// Router import
import { useNavigate, createSearchParams } from 'react-router-dom';

// Recoil import
import { useSetRecoilState } from 'recoil';
import { queryAtom } from '@/config/searchboxConfig';

function QuerySuggestions(props) {
  const { hits } = useHits(props);
  // router hook to navigate using a function
  const navigate = useNavigate();
  // Recoil State - update query in searchBar
  const setQueryState = useSetRecoilState(queryAtom);
  return (
    <div className="suggestions">
      <h3 className="suggestions__title">SUGGESTIONS</h3>
      <ul className="suggestions__items">
        {hits.map((hit, index) => {
          return (
            <li
              key={index}
              className="suggestions__item"
              onClick={() => {
                navigate({
                  pathname: '/search',
                  search: `?${createSearchParams({ query: hit.query })}`,
                });
                setQueryState(hit.query);
              }}
            >
              <ChevronRight />
              <p>
                <Highlight hit={hit} attribute="query" />
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default memo(QuerySuggestions);
