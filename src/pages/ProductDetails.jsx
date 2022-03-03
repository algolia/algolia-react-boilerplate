import React from 'react';

// framer-motion
import { motion } from 'framer-motion';
import { pageItem, mainTransition } from '../config/config';

// Import components
import { ChevronLeft } from '../assets/svg/SvgIndex';

// React router import
import { useNavigate } from 'react-router-dom';

// Recoil import
import { useRecoilValue } from 'recoil';
import { hitAtom } from '../config/results';

const ProductDetails = () => {
  const hit = useRecoilValue(hitAtom);
  const navigate = useNavigate();

  return (
    <div
      className="pdp"
      variants={pageItem}
      initial={pageItem.initial}
      animate={pageItem.animate}
      exit={pageItem.exit}
      transition={pageItem.transition}
    >
      <div className="pdp__wrapper">
        <div className="pdp__backBtn" onClick={() => navigate(-1)}>
          <ChevronLeft />
          <p>Back to search</p>
        </div>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: { mainTransition },
          }}
          className="pdp__left"
        >
          <motion.div
            className="container"
            initial={{
              // x: '-50%',
              // width: '30%',
              height: '100%',
              opacity: 0,
            }}
            animate={{
              x: 0,
              width: '100%',
              opacity: 1,
              transition: { delay: 0.2, mainTransition },
            }}
          >
            <motion.div className="imageWrapper">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={mainTransition}
                src={hit.full_url_image}
                alt=""
              />
            </motion.div>
          </motion.div>
        </motion.div>
        <div className="pdp__right">
          <motion.div
            className="pdp__right__infos"
            initial={{
              // x: '-50%',
              // width: '30%',
              // height: '100%',
              opacity: 0,
            }}
            animate={{
              x: 0,
              // width: '100%',
              opacity: 1,
              transition: { delay: 0.5, mainTransition },
            }}
          >
            <p className="brand">{hit.brand}</p>
            <p className="name">{hit.name}</p>
            <p className="color">{hit.colour}</p>
            <div className="sizes">
              <p>Available size(s):</p>
              <motion.div className="sizeList">
                {hit.sizeFilter.map((size) => (
                  <motion.div className="size">
                    <p>{size}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: { delay: 1, mainTransition },
              }}
              className="price"
            >
              {hit.price}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
