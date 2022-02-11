import { motion, AnimateSharedLayout } from 'framer-motion';
import React from 'react';
import { createClassNames, connectInfiniteHits } from 'react-instantsearch-dom';
import { connectInjectedHits } from './connectInjectedHits';

const cx = createClassNames('InfiniteHits');

export const InjectedInfiniteHits = connectInfiniteHits(
  connectInjectedHits(({ injectedHits, hasMore, refineNext }) => (
    <AnimateSharedLayout>
      <motion.div layout className={cx('')}>
        <motion.ul layout className={cx('list')}>
          {injectedHits.map(({ props, type, Hit }, index) => {
            return <Hit {...props} index={index} key={index} />;
          })}
        </motion.ul>
      </motion.div>
    </AnimateSharedLayout>
  ))
);

// {hasMore ? (
//   <button className={cx('loadMore')} onClick={refineNext}>
//     Load more
//   </button>
// ) : null}
