import React from 'react';
import { motion } from 'framer-motion';
import { framerMotionPage } from '@/config/animationConfig';
import useScreenSize from '@/hooks/useScreenSize';

const SkeletonLoader = () => {
  const { tablet, mobile } = useScreenSize();
  return (
    <motion.div
      className={`${tablet || mobile ? 'skeleton-mobile' : 'skeleton'}`} // initial state
      initial={framerMotionPage.initial}
      // actual animation
      animate={framerMotionPage.animate}
      // everything the animation needs to function
      variants={framerMotionPage}
      // what to do when unmounted
      exit={framerMotionPage.exit}
      // duration, smoothness etc.
      transition={framerMotionPage.transition}
    >
      <div
        className={`${
          tablet || mobile ? 'skeleton-mobile__facets' : 'skeleton__facets'
        }`}
      ></div>
      <div className="skeleton__hits">
        <div className="skeleton__sortBy"></div>
        <div
          className={`${
            tablet || mobile
              ? 'skeleton-mobile__hitsList'
              : 'skeleton__hitsList'
          }`}
        >
          <div className="skeleton__hit">
            <div className="skeleton__hit-top"></div>
            <div className="skeleton__hit-bottom"></div>
          </div>
          <div className="skeleton__hit">
            <div className="skeleton__hit-top"></div>
            <div className="skeleton__hit-bottom"></div>
          </div>
          <div className="skeleton__hit">
            <div className="skeleton__hit-top"></div>
            <div className="skeleton__hit-bottom"></div>
          </div>
          <div className="skeleton__hit">
            <div className="skeleton__hit-top"></div>
            <div className="skeleton__hit-bottom"></div>
          </div>
          <div className="skeleton__hit">
            <div className="skeleton__hit-top"></div>
            <div className="skeleton__hit-bottom"></div>
          </div>
          <div className="skeleton__hit">
            <div className="skeleton__hit-top"></div>
            <div className="skeleton__hit-bottom"></div>
          </div>
          <div className="skeleton__hit">
            <div className="skeleton__hit-top"></div>
            <div className="skeleton__hit-bottom"></div>
          </div>
          <div className="skeleton__hit">
            <div className="skeleton__hit-top"></div>
            <div className="skeleton__hit-bottom"></div>
          </div>
          <div className="skeleton__hit">
            <div className="skeleton__hit-top"></div>
            <div className="skeleton__hit-bottom"></div>
          </div>
          <div className="skeleton__hit">
            <div className="skeleton__hit-top"></div>
            <div className="skeleton__hit-bottom"></div>
          </div>
          <div className="skeleton__hit">
            <div className="skeleton__hit-top"></div>
            <div className="skeleton__hit-bottom"></div>
          </div>
          <div className="skeleton__hit">
            <div className="skeleton__hit-top"></div>
            <div className="skeleton__hit-bottom"></div>
          </div>
          <div className="skeleton__hit">
            <div className="skeleton__hit-top"></div>
            <div className="skeleton__hit-bottom"></div>
          </div>
          <div className="skeleton__hit">
            <div className="skeleton__hit-top"></div>
            <div className="skeleton__hit-bottom"></div>
          </div>
          <div className="skeleton__hit">
            <div className="skeleton__hit-top"></div>
            <div className="skeleton__hit-bottom"></div>
          </div>
          <div className="skeleton__hit">
            <div className="skeleton__hit-top"></div>
            <div className="skeleton__hit-bottom"></div>
          </div>
          <div className="skeleton__hit">
            <div className="skeleton__hit-top"></div>
            <div className="skeleton__hit-bottom"></div>
          </div>
          <div className="skeleton__hit">
            <div className="skeleton__hit-top"></div>
            <div className="skeleton__hit-bottom"></div>
          </div>
          <div className="skeleton__hit">
            <div className="skeleton__hit-top"></div>
            <div className="skeleton__hit-bottom"></div>
          </div>
          <div className="skeleton__hit">
            <div className="skeleton__hit-top"></div>
            <div className="skeleton__hit-bottom"></div>
          </div>
          <div className="skeleton__hit">
            <div className="skeleton__hit-top"></div>
            <div className="skeleton__hit-bottom"></div>
          </div>
          <div className="skeleton__hit">
            <div className="skeleton__hit-top"></div>
            <div className="skeleton__hit-bottom"></div>
          </div>
          <div className="skeleton__hit">
            <div className="skeleton__hit-top"></div>
            <div className="skeleton__hit-bottom"></div>
          </div>
          <div className="skeleton__hit">
            <div className="skeleton__hit-top"></div>
            <div className="skeleton__hit-bottom"></div>
          </div>
          <div className="skeleton__hit">
            <div className="skeleton__hit-top"></div>
            <div className="skeleton__hit-bottom"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SkeletonLoader;
