// This component renders a footer in Main.jsx, which can receive props if needed
// This footer is not designed to be interactive, but instead to perform better by not being an image

import { useRecoilValue } from 'recoil';

//Import scope SCSS
import './SCSS/newfooter.scss';

import logo from '@/assets/logo/logo.webp';

import { windowSize } from '@/hooks/useScreenSize';

const Footer = (props) => {
  const { isDesktop } = useRecoilValue(windowSize);
  return (
    <footer className="footer__wrapper">
      <div className="footer__container">
        <div className="footer__column__container">
          <div className="footer__column--company-details">
            <div className="footer__column__infos">
              <img className="footer__img" src={logo} alt="logo" />
              <ul>
                <li>
                  <a href="#">+49 (899) 415-390-6031</a>
                </li>
                <li>
                  <a href="#">support@algolia.com</a>
                </li>
                <li>14 New Street, London EC2M 4TR</li>
              </ul>
              <a
                href="https://www.google.com/maps/place/Algolia/@51.5174005,-0.0801417,15z/data=!4m2!3m1!1s0x0:0x81e12e2683f53ffe?sa=X&ved=2ahUKEwilu9OHtcb6AhUDYcAKHaUnC0cQ_BJ6BAhUEAU"
                target="_blank"
              >
                Google maps
              </a>
            </div>
          </div>
          <div className="footer__column">
            <h3>Company</h3>
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
          <div className="footer__column">
            <h3>Community</h3>
            <ul>
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
          <div className="footer__column">
            <h3>Categories</h3>
            <ul>
              <li>
                <a href="#">Mens</a>
              </li>
              <li>
                <a href="#">Womens</a>
              </li>
              <li>
                <a href="#">Accessoires</a>
              </li>
            </ul>
          </div>
          <div className="footer__column">Join our Newsletter</div>
        </div>
      </div>
      <div className="footer__bottom">
        <p>© 2022 ALGOLIA</p>
      </div>
    </footer>
  );
};

export default Footer;
