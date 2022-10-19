//  Import framer motion
import { motion } from 'framer-motion'

// Import config framer Motion
import { framerMotionHits } from '@/config/animationConfig'

// SALES CARD
const SalesCard = ({ hit }) => {
  return (
    <motion.div
      layout
      variants={framerMotionHits}
      initial={framerMotionHits.initial}
      exit={framerMotionHits.exit}
      animate={framerMotionHits.animate}
      transition={framerMotionHits.transition}
      className="image-wrapper-sales"
    >
      <img
        className="image-wrapper-sales__img"
        src={hit.image.desktop_url}
        alt="sales ad"
        loading="lazy"
      />
      <div className="image-wrapper-sales__infos">
        <p>{hit.coupon}</p>
        <h3>{hit.title}</h3>
      </div>
    </motion.div>
  )
}

export default SalesCard
