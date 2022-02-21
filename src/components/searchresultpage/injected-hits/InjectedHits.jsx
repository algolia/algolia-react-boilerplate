import React from 'react';
import { createClassNames, connectHits } from 'react-instantsearch-dom';
import { connectInjectedHits } from './connectInjectedHits';
import { motion, AnimatePresence } from 'framer-motion';

const cx = createClassNames('InfiniteHits');

export const InjectedHits = connectHits(
  connectInjectedHits(({ injectedHits }) => (
    <div className={cx('')}>
      <motion.ul className={cx('list')} layout>
        <AnimatePresence>
          {injectedHits.map(({ props, type, Hit }, index) => {
            return (
              // <li key={index} className={cx(type)}>
              <Hit {...props} index={index} key={index} />
              // </li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </div>
  ))
);
