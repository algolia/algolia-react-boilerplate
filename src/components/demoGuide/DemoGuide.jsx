import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import SearchTerms from './components/SearchTerms';
import SearchBanners from './components/SearchBanners';
import SearchPersona from './components/SearchPersona';
import DemoGuideInjectedContent from './components/DemoGuideInjectedContent';
import DemoGuideDynamicFilters from './components/DemoGuideDynamicFilters';
import useScreenSize from '@/hooks/useScreenSize';

import DemoGuideRedirect from './components/DemoGuideRedirect';

const DemoGuide = () => {
  const { tablet, mobile } = useScreenSize();

  return (
    <motion.div
      className={`${
        tablet || mobile ? 'helpNavigation-mobile' : ''
      } helpNavigation`}
      initial={{ opacity: 0, x: '-120%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
    >
      <h2>Help Navigation Panel</h2>
      <ul className="container-nav-help">
        <li className="container-nav-help__items ">
          <SearchTerms />
          <hr />
        </li>
        <li className="container-nav-help__items ">
          <SearchBanners />
          <hr />
        </li>
        <li className="container-nav-help__items ">
          <SearchPersona />
          <hr />
        </li>
        <li className="container-nav-help__items ">
          <DemoGuideInjectedContent />
          <hr />
        </li>
        <li className="container-nav-help__items ">
          <DemoGuideDynamicFilters />
          <hr />
        </li>
        <li className="container-nav-help__items ">
          <DemoGuideRedirect />
          <hr />
        </li>
      </ul>
    </motion.div>
  );
};

export default DemoGuide;
