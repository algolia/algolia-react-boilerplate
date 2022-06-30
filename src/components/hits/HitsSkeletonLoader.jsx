import React from 'react';
import useScreenSize from '@/hooks/useScreenSize';
import CustomSkeleton from '../skeletons/CustomSkeleton';

const SkeletonLoader = ({type}) => {
  const { tablet, mobile } = useScreenSize();

  switch (type) {
    case "hit":
      return (
        <div
          className={`${tablet || mobile ? 'skeleton-mobile' : 'skeleton'}`} // initial state
        >
          <div className="skeleton__hits">
            <div
              className={`${tablet || mobile
                ? 'skeleton-mobile__hitsList'
                : 'skeleton__hitsList'
                }`}
            >
              {[...Array(25)].map((e, i) => <div key={i + "hit"}><CustomSkeleton {...{type}} /></div>)}
            </div>
          </div>
        </div>
      );
    case "facet":
      return (
        <div className="">
          {/* {[...Array(4)].map((e, i) => <div key={i + "facet"}><CustomSkeleton {...{type}} /></div>)} */}
        </div>
      )
  }
};

export default SkeletonLoader;
