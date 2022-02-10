import React from 'react';

// Algolia's imports
import { connectHits, Highlight } from 'react-instantsearch-dom';

const Suggestions = ({ hits }) => {
  return (
    <div className="suggestions">
      <h3 className="suggestions__title">SUGGESTIONS</h3>
      <ul className="suggestions__items">
        {hits.map((hit) => {
          return (
            <li
              key={hit.query}
              className="suggestions__item"
              onClick={(e) => {}}
            >
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
