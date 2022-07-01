import useScreenSize from '@/hooks/useScreenSize';

const SkeletonLoader = () => {
  const { tablet, mobile } = useScreenSize();
  return (
    <div
      className={`${tablet || mobile ? 'skeleton-mobile' : 'skeleton'}`} // initial state
    >
      {/* <div
        className={`${
          tablet || mobile ? 'skeleton-mobile__facets' : 'skeleton__facets'
        }`}
      ></div> */}
      <div className="skeleton__hits">
        {/* <div className="skeleton__sortBy"></div> */}
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
    </div>
  );
};

export default SkeletonLoader;
