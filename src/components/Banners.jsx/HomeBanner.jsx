import React from 'react';

const HomeBanner = () => {
  return (
    <div className="home-banner-container">
      <div className="home-banner-container__infos">
        <h1>VALENTINE'S DAY</h1>
        <h2>20% OFF SITEWIDE</h2>
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
          <a href="#">Shop Now</a>
          <a href="#">See our Blog</a>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
