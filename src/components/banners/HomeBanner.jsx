import React from 'react';
import { connectQueryRules } from 'react-instantsearch-dom';

const HomeBanner = ({ items }) => {
  return items.map(({ title, subtitle, button }, index) => {
    if (!title) {
      return null;
    }
    return (
      <div className="home-banner-container" key={index}>
        <div className="home-banner-container__infos">
          <h1>{title}</h1>
          <h2>{subtitle}</h2>
        </div>
        <div className="home-banner-container__image-one">
          <img
            src="https://images.unsplash.com/photo-1609587312208-cea54be969e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt=""
          />
        </div>
        <div className="home-banner-container__image-two">
          <img
            src="https://images.unsplash.com/photo-1532039956299-1614b86a6d2f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt=""
          />
          <div className="home-banner-container__buttons">
            <a href="#">{button}</a>
            <a href="#">See our Blog</a>
          </div>
        </div>
      </div>
    );
  });
};

const CustomHomeBanner = connectQueryRules(HomeBanner);

export default CustomHomeBanner;
