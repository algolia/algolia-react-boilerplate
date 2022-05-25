// This component renders a footer in Main.jsx, which can receive props if needed
// NB it is normally (and currently) a screenshot image, stored in assets
import { motion } from 'framer-motion';
import footer from '@/assets/homepage/footer.png';
import { framerMotionFooter } from '@/config/animationConfig';

const Footer = (props) => {
  return (
    <motion.div
      className="footer"
      variants={framerMotionFooter}
      initial={framerMotionFooter.initial}
      animate={framerMotionFooter.animate}
      exit={framerMotionFooter.exit}
      transition={framerMotionFooter.transition}
    >
      <img src={footer} alt="" />
    </motion.div>
  );
};

export default Footer;
