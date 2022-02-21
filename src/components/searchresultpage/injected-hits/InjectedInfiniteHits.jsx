// import { motion, AnimatePresence } from 'framer-motion';
// import React from 'react';
// import { createClassNames, connectInfiniteHits } from 'react-instantsearch-dom';

// import { connectInjectedHits } from './connectInjectedHits';

// const cx = createClassNames('InfiniteHits');

// export const InjectedInfiniteHits = connectInfiniteHits(
//   connectInjectedHits(({ injectedHits }) => {
//     return (
//       <div layout className={cx('')}>
//         <motion.ul layout className={cx('list')}>
//           <AnimatePresence>
//             {injectedHits.map(({ props, Hit }, index) => {
//               return <Hit {...props} index={index} key={index} />;
//             })}
//           </AnimatePresence>
//         </motion.ul>
//       </div>
//     );
//   })
// );

// {hasMore ? (
//   <button className={cx('loadMore')} onClick={refineNext}>
//     Load more
//   </button>
// ) : null}
