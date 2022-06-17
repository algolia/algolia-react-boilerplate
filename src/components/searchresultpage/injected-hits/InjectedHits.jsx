// This builds the injected hits component

import { createClassNames, connectHits } from 'react-instantsearch-dom';
import { connectInjectedHits } from './connectInjectedHits';
import { motion, AnimatePresence } from 'framer-motion';
import { framerMotionPage } from '@/config/animationConfig';

const cx = createClassNames('InfiniteHits');

export const InjectedHits = connectHits(
  connectInjectedHits(({ injectedHits }) => (
    <motion.div
      className={cx('')}
      variants={framerMotionPage}
      initial={framerMotionPage.initial}
      animate={framerMotionPage.animate}
      exit={framerMotionPage.exit}
      transition={framerMotionPage.transition}
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
