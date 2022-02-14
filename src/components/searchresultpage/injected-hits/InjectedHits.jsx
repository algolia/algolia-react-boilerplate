import React from 'react';
import { createClassNames, connectHits } from 'react-instantsearch-dom';
import { connectInjectedHits } from './connectInjectedHits';

const cx = createClassNames('InfiniteHits');

export const InjectedHits = connectHits(
  connectInjectedHits(({ injectedHits }) => (
    <div className={cx('')}>
      <ul className={cx('list')}>
        {injectedHits.map(({ props, type, Hit }, index) => {
          return (
            <li key={index} className={cx(type)}>
              <Hit {...props} />
            </li>
          );
        })}
      </ul>
    </div>
  ))
);
