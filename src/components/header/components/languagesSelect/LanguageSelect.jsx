// This is the language selector for the Navigation section in the header.
// NB this isn't functional on the flagship index as we only have one language

import { memo } from 'react';

// Import the Select widget (https://react-select.com/home)
import Select from 'react-select';

// Import Recoil for state management
import { useSetRecoilState } from 'recoil';

// Import configuration
import { linksHeader } from '@/config/headerConfig';
import { languagesConfig, styles } from '@/config/languagesConfig';

//Import main index atom
import { mainIndex } from '@/config/algoliaEnvConfig';

// Changing index & currency throurgh the app
import { currencySymbolAtom } from '@/config/currencyConfig';
import {
  languageSwitchConfig,
  LanguageSelectedAtom,
} from '@/config/languagesConfig';

//Use Translation
import { useTranslation } from 'react-i18next';

const LanguageSelect = memo(() => {
  // Get index & currency atom to use it in the switch statement
  const setCurrency = useSetRecoilState(currencySymbolAtom);
  const index = useSetRecoilState(mainIndex);
  const navigationLinks = useSetRecoilState(linksHeader);
  const setLanguageSelected = useSetRecoilState(LanguageSelectedAtom);
  // Use the translator
  const { i18n } = useTranslation();

  const handleChangeOfLanguage = (e) => {
    switch (e.value) {
      case 'English':
        index(languageSwitchConfig.EN.index);
        setCurrency(languageSwitchConfig.EN.currency);
        navigationLinks(languageSwitchConfig.EN.linksHeader);
        setLanguageSelected('English');
        i18n.changeLanguage('en');
        break;
      case 'French':
        index(languageSwitchConfig.FR.index);
        setCurrency(languageSwitchConfig.FR.currency);
        setLanguageSelected('French');
        navigationLinks(languageSwitchConfig.FR.linksHeader);
        i18n.changeLanguage('fr');
        break;
    }
  };
  return (
    <Select
      defaultValue={languagesConfig}
      options={languagesConfig}
      styles={styles}
      placeholder="Language"
      classNamePrefix="react-select"
      onChange={(e) => {
        handleChangeOfLanguage(e);
      }}
    />
  );
});

export default LanguageSelect;
