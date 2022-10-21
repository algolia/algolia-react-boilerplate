import { AnimatePresence, motion } from 'framer-motion'
// import SCSS
import './SCSS/loader.scss'

const Loader = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="loader"
      >
        <div className="loader__in"></div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Loader
