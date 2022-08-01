// NB: we need React declared for the Fragments used here
import { Fragment, useState, useEffect } from 'react';
// This component will be wrapped in connectQueryRules (https://www.algolia.com/doc/api-reference/widgets/query-rule-custom-data/react/#connector)
import { useQueryRules } from 'react-instantsearch-hooks-web';

// Imports from router
import { Link } from 'react-router-dom';
import CustomSkeleton from '../skeletons/CustomSkeleton';

//Import scope SCSS
import './SCSS/homeBanner.scss';

// This component renders a different banner based on the props passed to it.
//The props are passed through the Dashboard in rules section.
function CustomHomeBanners(props) {
  const { items } = useQueryRules(props);
  return items.map(
    ({ type, title, subtitle, button1, LinkButton1, imgUrl1 }, index) => {
      if (type === 'HomeBannerTwo') {
        return (
          <div className="homeBanner" key={title}>
            <HomeBannerComponent
              imgUrl1={imgUrl1}
              title={title}
              subtitle={subtitle}
              LinkButton1={LinkButton1}
              button1={button1}
            />
          </div>
        );
      }
    }
  );
}

const HomeBannerComponent = ({
  imgUrl1,
  title,
  subtitle,
  LinkButton1,
  button1,
}) => {
  const [isBannerLoaded, setIsBannerLoaded] = useState(false);
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    //Preload image
    const img = new Image();
    img.src = imgUrl1;
    setBanner(img.src);
  }, []);

  return (
    <div className="home-banner3-container">
      <div className="home-banner3-container__image">
        {isBannerLoaded === false && <CustomSkeleton type="banner" />}
        <img
          src={banner}
          alt="homeBanner"
          fetchpriority="high"
          width="1121"
          height="466"
          onLoad={() => setIsBannerLoaded(true)}
        />
        <div className="overlay"></div>
      </div>
      <div className="home-banner3-container__infos">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </div>
      <div className="home-banner3-container__buttons">
        <Link to={LinkButton1}>
          <div className="home-banner3-container__buttons__circles">
            <div className="home-banner3-container__buttons__circles__circles2">
              <div className="home-banner3-container__buttons__circles__circles2__circles3">
                <p>{button1}</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CustomHomeBanners;
