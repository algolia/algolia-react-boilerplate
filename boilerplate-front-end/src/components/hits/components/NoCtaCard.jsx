// Component to render injected content from the Algolia dashboard, eg 'Free return Policy'
import { motion } from 'framer-motion'

// Import framer Motion config
import { framerMotionHits } from '@/config/animationConfig'

// Display an image, within a framer-motion wrapper
const NoCtaCard = ({ hit }) => {
  return (
    <motion.div
      variants={framerMotionHits}
      initial="hidden"
      animate="show"
      className="hit-list"
    >
      <img src={hit.image.desktop_url} loading="lazy" alt="" />
    </motion.div>
  )
}

export default NoCtaCard
