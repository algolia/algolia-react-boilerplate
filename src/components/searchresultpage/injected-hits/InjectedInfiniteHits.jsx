import React from 'react';
import { createClassNames, connectInfiniteHits } from 'react-instantsearch-dom';
import { connectInjectedHits } from './connectInjectedHits';

const cx = createClassNames('InfiniteHits');

export const InjectedInfiniteHits = connectInfiniteHits(
  connectInjectedHits(({ injectedHits, hasMore, refineNext }) => (
    <div className={cx('')}>
      <ul className={cx('list')}>
        {injectedHits.map(({ props, type, Hit }, index) => {
          return (  
              <Hit {...props} index={index} key={index} />
          );
        })}
      </ul>
    </div>    
    ))
  );
  
  // {hasMore ? (
  //   <button className={cx('loadMore')} onClick={refineNext}>
  //     Load more
  //   </button>
  // ) : null}