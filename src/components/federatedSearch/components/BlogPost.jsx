import React from 'react';
import { connectHits } from 'react-instantsearch-dom';

const ArticlesItems = ({ hits }) => {
  console.log('ArticlesItems called');
  return (
    <div className="articles__wrapper">
      <h3 className="articles__title">ARTICLES</h3>
      {hits.map((hit, index) => {
        return (
          <div key={index} className="articles__item">
            <div className="image-wrapper">
              <img src={hit['Image Link']} alt="" />
              <p className="title">{hit.Title}</p>
              <div className="overlay"></div>
            </div>
            <div className="infos">
              <p className="date">{hit.Date}</p>
              <p>{hit.Subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Articles = connectHits(ArticlesItems);
export default React.memo(Articles);
