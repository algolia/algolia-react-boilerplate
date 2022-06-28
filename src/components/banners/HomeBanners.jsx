// TODO: 1. homepagebannerthree is declared as its own component, but also in HomeBanners?
//       2. Why is the order of banners wrong?
// This page builds the various banners that are used on the Homepage

// NB: we need React declared for the Fragments used here
import { Fragment, memo } from 'react';
// This component will be wrapped in connectQueryRules (https://www.algolia.com/doc/api-reference/widgets/query-rule-custom-data/react/#connector)
import { useQueryRules } from 'react-instantsearch-hooks-web';

// Imports from router
import { Link } from 'react-router-dom';

// This component renders a different banner based on the props passed to it.
//The props are passed through the Dashboard in rules section.
function CustomHomeBanners(props) {
  const { items } = useQueryRules(props);
  console.log(items);
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
}

export default memo(CustomHomeBanners);

const BannerTwo = ({ imgUrl1, title, subtitle, LinkButton1, button1 }) => (
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
