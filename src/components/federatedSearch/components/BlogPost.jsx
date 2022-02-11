import React from 'react';
import { connectHits } from 'react-instantsearch-dom';

const ArticlesItems = ({ hits }) => {
  return (
    <div className="articles__wrapper">
      <h3 className="articles__title">ARTICLES</h3>
      {hits.map((hit, index) => {
        return (
          <div key={index} className="articles__item">
            <div className="image-wrapper">
              <img src={hit['Image Link']} alt="" />

              <p className="date">{hit.Date}</p>
              <div className="overlay"></div>
            </div>
            <div className="infos">
              <p className="title">{hit.Title}</p>
              <p className="subtitle">{hit.Subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Articles = connectHits(ArticlesItems);
export default React.memo(Articles);
