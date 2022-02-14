import React from 'react';

// Algolia's imports
import { connectHits, Highlight } from 'react-instantsearch-dom';

// components import
import { ChevronRight } from '../../../assets/svg/SvgIndex';

import { useNavigate, createSearchParams } from 'react-router-dom';

// recoil import
import { useSetRecoilState } from 'recoil';
import { queryAtom } from '../../../config/searchbox';

const Suggestions = ({ hits }) => {
  // router hook to navigate using a function
  const navigate = useNavigate();
  // update query in searchBar
  const setQueryState = useSetRecoilState(queryAtom);
  return (
    <div className="suggestions">
      <h3 className="suggestions__title">SUGGESTIONS</h3>
      <ul className="suggestions__items">
        {hits.map((hit) => {
          return (
            <li
              key={hit.query}
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
};

const QuerySuggestions = connectHits(Suggestions);

export default React.memo(QuerySuggestions);
