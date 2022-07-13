// import Recoil States
import { useSetRecoilState } from 'recoil';

//import configuration
import { segmentSelectedAtom } from '@/config/segmentConfig';
import { personaSelectedAtom } from '@/config/personaConfig';
// Changing index & currency through the app
import { currencySymbolAtom } from '@/config/currencyConfig';
import { languageSwitchConfig } from '@/config/languagesConfig';
import { linksHeader } from '@/config/headerConfig';

// Import index to handle language changes
import { mainIndex } from '@/config/algoliaEnvConfig';

// Import components
import { ChevronDown } from '@/assets/svg/SvgIndex';

export const Selectors = ({ props }) => {
  return (
    <div className="selectorsWrapper">
      <button>
        <p>{props[0].label}</p>
        <ChevronDown />
      </button>
      <ul>
        {props.map((item) => (
          <SelectItem
            label={item.label}
            value={item.value}
            type={item.type}
            key={item.label}
          />
        ))}
      </ul>
    </div>
  );
};

const SelectItem = ({ label, value, type }) => {
  const setSegmentSelect = useSetRecoilState(segmentSelectedAtom);
  const setPersonaSelect = useSetRecoilState(personaSelectedAtom);
  // Get index & currency atom to use it in the switch statement
  const setCurrency = useSetRecoilState(currencySymbolAtom);
  const index = useSetRecoilState(mainIndex);
  const navigationLinks = useSetRecoilState(linksHeader);

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

  const handleClick = (type, value) => {
    switch (type) {
      case 'segment':
        setSegmentSelect(value);
        break;
      case 'persona':
        setPersonaSelect(value);
        break;
      case 'language':
        handleChangeOfLanguage(value);
        break;
      default:
        break;
    }
  };

  return <li onClick={() => handleClick(type, value)}>{label}</li>;
};
