// TODO: 1. homepagebannerthree is declared as its own component, but also in HomeBanners?
//       2. Why is the order of banners wrong?
// This page builds the various banners that are used on the Homepage

// NB: we need React declared for the Fragments used here
import { Fragment } from 'react';
// This component will be wrapped in connectQueryRules (https://www.algolia.com/doc/api-reference/widgets/query-rule-custom-data/react/#connector)
import { connectQueryRules } from 'react-instantsearch-dom';

// Imports from router
import { Link } from 'react-router-dom';

// This component renders a different banner based on the props passed to it.
//The props are passed through the Dashboard in rules section.
const HomeBanners = ({ items }) => {
  return items.map(
    (
      {
        type,
        title,
        subtitle,
        button1,
        LinkButton1,
        button2,
        LinkButton2,
        imgUrl1,
        imgUrl2,
        imgUrl3,
      },
      index
    ) => {
      if (type === 'HomeBannerOne') {
        return (
          <Fragment key={index}>
            <BannerOne
              imgUrl1={imgUrl1}
              title={title}
              subtitle={subtitle}
              imgUrl2={imgUrl2}
              imgUrl3={imgUrl3}
              LinkButton1={LinkButton1}
              button1={button1}
              LinkButton2={LinkButton2}
              button2={button2}
            />
          </Fragment>
        );
      }
      if (type === 'HomeBannerTwo') {
        return (
          <Fragment key={index}>
            <BannerTwo
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

const BannerOne = ({
  imgUrl1,
  title,
  subtitle,
  imgUrl2,
  imgUrl3,
  LinkButton1,
  button1,
  LinkButton2,
  button2,
}) => {
  <div
    className="home-banner-container"
    style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.62), rgba(0, 0, 0, 0.45)), url(${imgUrl1})`,
    }}
    key={index}
  >
    <div className="home-banner-container__infos">
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </div>
    <div className="home-banner-container__image-one">
      <img src={imgUrl2} alt="" />
    </div>
    <div className="home-banner-container__image-two">
      <img src={imgUrl3} alt="" />
      <div className="home-banner-container__buttons">
        <Link to={LinkButton1}>{button1}</Link>
        <Link to={LinkButton2}>{button2}</Link>
      </div>
    </div>
  </div>;
};

const BannerTwo = ({ imgUrl1, title, subtitle, LinkButton1, button1 }) => {
  return (
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
        <div className="home-banner3-container__buttons__circles">
          <div className="home-banner3-container__buttons__circles__circles2">
            <div className="home-banner3-container__buttons__circles__circles2__circles3">
              <Link to={LinkButton1}>{button1}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomHomeBanners = connectQueryRules(HomeBanners);

export default CustomHomeBanners;
