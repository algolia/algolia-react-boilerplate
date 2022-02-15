import React from 'react';
import { QueryRuleCustomData } from 'react-instantsearch-dom';

const Banner = () => {
  return (
    <QueryRuleCustomData>
      {({ items }) =>
        items.map((item) => {
          console.log(item.type);
          return item.type === 'bannerSrp' ? <p>{item.title}</p> : '';
        })
      }
    </QueryRuleCustomData>
  );
};

export default Banner;
