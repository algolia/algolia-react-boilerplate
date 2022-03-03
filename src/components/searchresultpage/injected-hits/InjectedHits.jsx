import React from 'react';
import { createClassNames, connectHits } from 'react-instantsearch-dom';
import { connectInjectedHits } from './connectInjectedHits';
import { motion, AnimatePresence } from 'framer-motion';
import { pageItem } from '../../../config/config';

const cx = createClassNames('InfiniteHits');

export const InjectedHits = connectHits(
  connectInjectedHits(({ injectedHits }) => (
    <motion.div
      className={cx('')}
      variants={pageItem}
      initial={pageItem.initial}
      animate={pageItem.animate}
      exit={pageItem.exit}
      transition={pageItem.transition}
    >
      <motion.ul className={cx('list')} layout>
        <AnimatePresence initial={false}>
          {injectedHits.map(({ props, type, Hit }, index) => {
            return <Hit {...props} index={index} key={index} />;
          })}
        </AnimatePresence>
      </motion.ul>
    </motion.div>
  ))
);
