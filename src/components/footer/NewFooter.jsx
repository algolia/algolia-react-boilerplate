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
        <div className="footer__column--company-details">Algolia</div>
        <div className="footer__column">about </div>
        <div className="footer__column">community</div>
        <div className="footer__column">legal</div>
        <div className="footer__column">Join our Newsletter</div>
      </div>
    </footer>
  );
};

export default Footer;
