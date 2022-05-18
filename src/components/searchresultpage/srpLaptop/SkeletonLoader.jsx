import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="skeleton">
      <div className="skeleton__facets"></div>
      <div className="skeleton__hits">
        <div className="skeleton__sortBy"></div>
        <div className="skeleton__hitsList">
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
    </div>
  );
};

export default SkeletonLoader;
