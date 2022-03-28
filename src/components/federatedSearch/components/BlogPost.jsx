// Render the blog post in federated search
import { memo } from 'react';

// Algolia
import { connectHits } from 'react-instantsearch-dom';
import { useRecoilValue } from 'recoil';

import { contentArticlesConfig } from '../../../config/hits';

const ArticlesItems = ({ hits }) => {
  const { image, date, title, headings } = useRecoilValue(
    contentArticlesConfig
  );
  return (
    <div className="articles__wrapper">
      <h3 className="articles__title">ARTICLES</h3>
      {hits.map((hit, index) => {
        return (
          <div key={index} className="articles__item">
            <div className="image-wrapper">
              <img src={hit[image]} alt="" />

              <p className="date">{hit[date]}</p>
              <div className="overlay"></div>
            </div>
            <div className="infos">
              <p className="title">{hit[title]}</p>
              <p className="subtitle">{hit[headings]}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Articles = connectHits(ArticlesItems);
export default memo(Articles);
