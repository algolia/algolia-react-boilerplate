// This builds the injected hits component

import { createClassNames, connectHits } from 'react-instantsearch-dom';
import { connectInjectedHits } from './connectInjectedHits';
import React, { useState, useEffect } from 'react';

const cx = createClassNames('InfiniteHits');

export const InjectedHits = connectHits(
  connectInjectedHits(({ injectedHits }) => (
    <CustomInjectedHit injectedHits={injectedHits} />
  ))
);

const CustomInjectedHit = ({ injectedHits }) => {
  const [hitsLoaded, setHitsLoaded] = useState(false);

  useEffect(() => {
    if (injectedHits.length > 0) {
      setHitsLoaded(true)
    }
  }, [injectedHits]);

  return (
    <div
      className={cx('')}
    >
      <div className={cx('list')}>
          {injectedHits.map(({ props, Hit }, index) => {
            return <div className="" key={index}>{hitsLoaded ? <Hit {...props} {...{index}}  /> : <CustomSkeleton type="hit" />}</div>
          })}
      </div>
    </div>
  )
}

