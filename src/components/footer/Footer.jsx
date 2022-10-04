// This component renders a footer in Main.jsx, which can receive props if needed
// NB it is normally (and currently) a screenshot image, stored in assets
import footer from '@/assets/homepage/footer.webp';

import logo from '@/assets/logo/logo.webp';

//Import scope SCSS
import './SCSS/footer.scss';

const Footer = (props) => {
  return (
    <div className="footer">
      <footer>
        <footer className="footer-area border-top-2 pt-50">
          <div className="footer-top">
            <div className="custom-container">
              <div className="row">
                <div className="footer-column footer-column-1">
                  <div className="footer-widget footer-about-2 mb-30">
                    <div className="footer-logo">
                      <a href="index.html">
                        <img className="footer-img" src={logo} alt="logo" />
                      </a>
                    </div>
                    <div className="footer-info">
                      <ul>
                        <li>
                          <a href="#">+49 (899) 9829960</a>
                        </li>
                        <li>
                          <a href="#">support@algolia.com</a>
                        </li>
                        <li>14 New Street, London EC2M 4TR</li>
                      </ul>
                    </div>
                    <div className="footer-map">
                      <a
                        href="https://www.google.com/maps/place/Algolia/@51.5174005,-0.0801417,15z/data=!4m2!3m1!1s0x0:0x81e12e2683f53ffe?sa=X&ved=2ahUKEwilu9OHtcb6AhUDYcAKHaUnC0cQ_BJ6BAhUEAU"
                        target="_blank"
                      >
                        Google maps
                      </a>
                    </div>
                  </div>
                </div>
                <div className="footer-column footer-column-2">
                  <div className="footer-widget mb-30">
                    <div className="widget-title">
                      <h3>COMPANY</h3>
                    </div>
                    <div className="footer-list">
                      <ul>
                        <li>
                          <a href="#">About Us</a>
                        </li>
                        <li>
                          <a href="#">Jobs</a>
                        </li>
                        <li>
                          <a href="#">Press</a>
                        </li>
                        <li>
                          <a href="#">Contact</a>
                        </li>
                        <li>
                          <a href="#">Blog</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="footer-column footer-column-3">
                  <div className="footer-widget mb-30">
                    <div className="widget-title">
                      <h3>COMMUNITY</h3>
                    </div>
                    <div className="footer-list">
                      <ul>
                        <li>
                          <a href="#">Community</a>
                        </li>
                        <li>
                          <a href="#">Facebook group</a>
                        </li>
                        <li>
                          <a href="#">Forums</a>
                        </li>
                        <li>
                          <a href="#">Meetups</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="footer-column footer-column-4">
                  <div className="footer-widget mb-30">
                    <div className="widget-title">
                      <h3>LEGAL</h3>
                    </div>
                    <div className="footer-list">
                      <ul>
                        <li>
                          <a href="#">Privacy Policy</a>
                        </li>
                        <li>
                          <a href="#">Terms of Use</a>
                        </li>
                        <li>
                          <a href="#">License Agreement</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="footer-column footer-column-5">
                  <div className="footer-widget mb-30">
                    <div className="widget-title">
                      <h3>PROFILE</h3>
                    </div>
                    <div className="footer-list">
                      <ul>
                        <li>
                          <a href="#">My Account</a>
                        </li>
                        <li>
                          <a href="#">Checkout</a>
                        </li>
                        <li>
                          <a href="#">Order tracking</a>
                        </li>
                        <li>
                          <a href="#">Help &amp; Support</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="footer-column footer-column-6">
                  <div className="footer-widget subscribe-right mb-30">
                    <div className="widget-title">
                      <h3>JOIN OUR NEWSLETTER</h3>
                    </div>
                    <div
                      id="mc_embed_signup"
                      className="subscribe-form-2 mt-20"
                    >
                      <form
                        className="validate subscribe-form-style"
                        noValidate=""
                      >
                        <div id="mc_embed_signup_scroll" className="mc-form-2">
                          <input
                            className="email"
                            type="email"
                            required=""
                            placeholder="Enter your email address..."
                            name="EMAIL"
                          />
                          <div className="mc-news-2" aria-hidden="true">
                            <input
                              type="text"
                              tabIndex="-1"
                              name="b_6bbb9b6f5827bd842d9640c82_05d85f18ef"
                            />
                          </div>
                          <div className="clear-2">
                            <input
                              className="button"
                              type="submit"
                              name="subscribe"
                              value="Submit"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom pt-25 pb-15">
            <div className="custom-container">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-6 col-12"></div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                  <div className="footer-widget copyright-2 text-center">
                    <p>© 2022 ALGOLIA</p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                  <div className="footer-widget payments-img">
                    <a></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </footer>
    </div>
  );
};

export default Footer;
