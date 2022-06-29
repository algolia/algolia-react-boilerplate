// This builds the injected hits component

import { createClassNames, connectHits } from 'react-instantsearch-dom';
import { connectInjectedHits } from './connectInjectedHits';
import React, { useState, useEffect } from 'react';

const cx = createClassNames('InfiniteHits');
// TODO: Skeleton here
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

  const renderHit = (args) => {
    const {props, Hit, index} = args;

    if (hitsLoaded) {
      return <Hit {...props} index={index} key={index} />
    } else {
      return <div className="" style={{width: "100px", height: "200px", backgroundColor: "red"}}></div>
    }
  }

  return (
    <div
      className={cx('')}
    >
      <div className={cx('list')}>
          {injectedHits.map(({ props, type, Hit }, index) => {
            return renderHit({props, type, Hit, index});
          })}
      </div>
    </div>
  )
}

