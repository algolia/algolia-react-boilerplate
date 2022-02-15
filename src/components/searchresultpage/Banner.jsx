import React from 'react';
import { QueryRuleCustomData } from 'react-instantsearch-dom';

const Banner = () => {
  return (
    <QueryRuleCustomData>
      {({ items }) =>
        items.map((item) => {
          return item.type === 'bannerSrp' ? (
            <div
              className="banner-srp"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.62), rgba(0, 0, 0, 0.45)), url(${item.banner})`,
              }}
            >
              <div className="banner-srp__infos">
                <h3>{item.title}</h3>
                <p>{item.content}</p>
              </div>
            </div>
          ) : (
            ''
          );
        })
      }
    </QueryRuleCustomData>
  );
};

export default Banner;
