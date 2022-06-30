// NB: we need React declared for the Fragments used here
import { Fragment } from 'react';
// This component will be wrapped in connectQueryRules (https://www.algolia.com/doc/api-reference/widgets/query-rule-custom-data/react/#connector)
import { connectQueryRules } from 'react-instantsearch-dom';

// Imports from router
import { Link } from 'react-router-dom';

//Import scope SCSS
import './SCSS/HomeBanner.scss';

const HomeBanner = ({ items }) => {
  return items.map(
    ({ type, title, subtitle, button1, LinkButton1, imgUrl1 }, index) => {
      if (type === 'HomeBannerTwo') {
        return (
          <Fragment key={index}>
            <HomeBannerComponent
              imgUrl1={imgUrl1}
              title={title}
              subtitle={subtitle}
              LinkButton1={LinkButton1}
              button1={button1}
            />
          </Fragment>
        );
      }
    }
  );
};

const HomeBannerComponent = ({
  imgUrl1,
  title,
  subtitle,
  LinkButton1,
  button1,
}) => (
  <div className="home-banner3-container">
    <div className="home-banner3-container__image">
      <img src={imgUrl1} alt="" />
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

const CustomHomeBanners = connectQueryRules(HomeBanner);

export default CustomHomeBanners;
