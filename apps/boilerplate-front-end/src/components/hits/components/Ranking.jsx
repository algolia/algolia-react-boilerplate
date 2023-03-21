// Import framer-motion for animation on hits
import { motion } from 'framer-motion'

import toPairs from 'lodash/toPairs'
import isEqual from 'lodash/isEqual'
import differenceWith from 'lodash/differenceWith'

import { framerMotionHits } from '@/config/animationConfig'

const RankingFormulaOverlay = ({ hit, nextHit }) => {
  if (nextHit === undefined) return <p>Scroll to load more results</p>

  const changes = differenceWith(
    toPairs(nextHit._rankingInfo),
    toPairs(hit._rankingInfo),
    isEqual
  )

  return (
    <motion.div
      variants={framerMotionHits}
      initial={framerMotionHits.initial}
      exit={framerMotionHits.exit}
      animate={framerMotionHits.animate}
      transition={{
        duration: 0.3,
        delay: 0,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
      className="ranking-formula"
    >
      {hit._rankingInfo &&
        changes.length &&
        changes.map((change, i) => {
          return (
            <p key={i}>
              {change[0]} of {JSON.stringify(hit._rankingInfo[change[0]])} vs{' '}
              {JSON.stringify(nextHit._rankingInfo[change[0]])}
            </p>
          )
        })}
      {hit._rankingInfo && changes.length === 0 && (
        <p>result is the same as the next result</p>
      )}
    </motion.div>
  )
}

export default RankingFormulaOverlay
