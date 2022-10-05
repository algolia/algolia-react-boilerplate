// This component renders a footer in Main.jsx, which can receive props if needed
// This footer is not designed to be interactive, but instead to perform better by not being an image

import { useRecoilValue } from 'recoil';

//Import scope SCSS
import './SCSS/footer.scss';

import logo from '@/assets/logo/logo.webp';

import { windowSize } from '@/hooks/useScreenSize';

const Footer = (props) => {
  const { isDesktop } = useRecoilValue(windowSize);

  return (
    <div className="footer">
      <footer>
        <footer className="footer-area">
          <div className="footer-top">
            <div className={`custom-container${!isDesktop ? '__mobile' : ''}`}>
              <div className="row">
                <div
                  className={`footer-column__company-details${
                    !isDesktop ? '__mobile' : ''
                  }`}
                >
                  <div className="footer-widget">
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
                <div
                  className={`columns-wrapper${!isDesktop ? '__mobile' : ''}`}
                >
                  <div className="footer-column">
                    <div className="footer-widget">
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
                  <div className="footer-column">
                    <div className="footer-widget">
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
                  <div className="footer-column">
                    <div className="footer-widget">
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
                  <div className="footer-column">
                    <div className="footer-widget">
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
                  <div className="footer-column">
                    <div className="footer-widget">
                      <div className="widget-title">
                        <h3>JOIN OUR NEWSLETTER</h3>
                      </div>
                      <div id="mc_embed_signup" className="subscribe-form-2">
                        <form
                          className="validate subscribe-form-style"
                          noValidate=""
                        >
                          <div
                            id="mc_embed_signup_scroll"
                            className="mc-form-2"
                          >
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
          </div>
          <div className="footer-bottom">
            <div className="custom-container">
              <div className="footer-widget copyright-2">
                <p>© 2022 ALGOLIA</p>
              </div>
            </div>
          </div>
        </footer>
      </footer>
    </div>
  );
};

export default Footer;
