import { useState, useRef } from 'react';

// React-router
import { useNavigate, createSearchParams } from 'react-router-dom';

// import Recoil States
import { useSetRecoilState } from 'recoil';

//import configuration
import { segmentSelectedAtom } from '@/config/segmentConfig';
import { personaSelectedAtom } from '@/config/personaConfig';
import { personaSelectedFiltersAtom } from '@/config/personaConfig';
import { queryAtom } from '@/config/searchboxConfig';
// Changing index & currency through the app
import { currencySymbolAtom } from '@/config/currencyConfig';
import { languageSwitchConfig } from '@/config/languagesConfig';
import { linksHeader } from '@/config/headerConfig';

// handle Alert config
import {
  alertContent as alertContentAtom,
  isAlertOpen,
} from '@/config/demoGuideConfig';

// Import index to handle language changes
import { mainIndex } from '@/config/algoliaEnvConfig';

// Import components
import { ChevronDown } from '@/assets/svg/SvgIndex';

// import Custom Hook
import useOutsideClick from '@/hooks/useOutsideClick';

// import scoped CSS
import './selectors.scss';

export const Selectors = ({ props }) => {
  const [menuActive, setMenuActive] = useState(false);
  const [selectedValue, setSelectedValue] = useState(props[0].label);
  const selectorBtn = useRef();

  useOutsideClick(selectorBtn.current, () => setMenuActive(false));

  return (
    <div className="selectorsWrapper">
      <button
        className="selectorsWrapper__btn"
        onClick={() => setMenuActive(!menuActive)}
        ref={selectorBtn}
      >
        <p>{selectedValue}</p>
        <ChevronDown />
      </button>
      <ul
        className={
          menuActive
            ? 'selectorsWrapper__list active'
            : 'selectorsWrapper__list'
        }
      >
        {props.map((item) => (
          <SelectItem
            label={item.label}
            value={item.value}
            type={item.type}
            key={item.label}
            alertContent={item.alertContent}
            personalizationFilters={item.personalizationFilters}
            setSelectedValue={setSelectedValue}
          />
        ))}
      </ul>
    </div>
  );
};

const SelectItem = ({
  label,
  value,
  type,
  alertContent,
  setSelectedValue,
  personalizationFilters,
}) => {
  const setSegmentSelect = useSetRecoilState(segmentSelectedAtom);
  const setPersonaSelect = useSetRecoilState(personaSelectedAtom);
  const setPersonaSelectedFilters = useSetRecoilState(
    personaSelectedFiltersAtom
  );
  // Recoil State - update query in searchBar
  const setQueryState = useSetRecoilState(queryAtom);
  // Get index & currency atom to use it in the switch statement
  const setCurrency = useSetRecoilState(currencySymbolAtom);
  const index = useSetRecoilState(mainIndex);
  const navigationLinks = useSetRecoilState(linksHeader);

  // Recoil state for alert
  const setAlert = useSetRecoilState(alertContentAtom);
  const setAlertOpen = useSetRecoilState(isAlertOpen);

  const handleChangeOfLanguage = (e) => {
    switch (e) {
      case 'English':
        index(languageSwitchConfig.EN.index);
        setCurrency(languageSwitchConfig.EN.currency);
        navigationLinks(languageSwitchConfig.EN.linksHeader);
        break;
      case 'French':
        index(languageSwitchConfig.FR.index);
        setCurrency(languageSwitchConfig.FR.currency);
        navigationLinks(languageSwitchConfig.FR.linksHeader);
        break;
      case 'German':
        index(languageSwitchConfig.GER.index);
        setCurrency(languageSwitchConfig.GER.currency);
        navigationLinks(languageSwitchConfig.GER.linksHeader);
        break;
    }
  };

  const triggerAlert = (content) => {
    setAlertOpen(true);
    setAlert(content);
    setTimeout(() => setAlertOpen(false), 5000);
  };

  // router hook to navigate using a function
  const navigate = useNavigate();

  const handleClick = (type, value, alertContent, personalizationFilters) => {
    switch (type) {
      case 'segment':
        setSegmentSelect(value);
        break;
      case 'persona':
        setPersonaSelect(value);
        setPersonaSelectedFilters(personalizationFilters);
        break;
      case 'language':
        handleChangeOfLanguage(value);
        break;
      case 'dynamic filters':
      case 'injected content':
      case 'redirect':
      case 'banner':
      case 'search terms':
        if (value !== '') {
          navigate({
            pathname: '/search',
            search: `?${createSearchParams({ query: value })}`,
          });
          setQueryState(value);
          triggerAlert(alertContent);
        }
        break;
      default:
        break;
    }
  };

  return (
    <li
      className="selectorsWrapper__listItem"
      onClick={() => {
        handleClick(type, value, alertContent, personalizationFilters);
        setSelectedValue(label);
      }}
    >
      {label}
    </li>
  );
};
