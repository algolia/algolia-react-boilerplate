import { memo } from 'react';

// Import the Select widget (https://react-select.com/home)
import Select from 'react-select';

// Import Recoil for state management
import { useSetRecoilState } from 'recoil';

// Import configuration
import { languagesConfig, styles } from '@/config/languagesConfig';

//Import main index atom
import { mainIndex } from '@/config/algoliaEnvConfig';

// Changing index & currency throurgh the app
import { currencySymbolAtom } from '@/config/currencyConfig';
import { languageSwitchConfig } from '@/config/languagesConfig';

const LanguageSelect = memo(() => {
  // Get index & currency atom to use it in the switch statement
  const setCurrency = useSetRecoilState(currencySymbolAtom);
  const index = useSetRecoilState(mainIndex);

  const handleChangeOfLanguage = (e) => {
    switch (e.value) {
      case 'English':
        index(languageSwitchConfig.EN.index);
        setCurrency(languageSwitchConfig.EN.currency);
        break;
      case 'Spanish':
        index(languageSwitchConfig.SPA.index);
        setCurrency(languageSwitchConfig.SPA.currency);
        break;
      case 'French':
        index(languageSwitchConfig.FR.index);
        setCurrency(languageSwitchConfig.FR.currency);
        break;
      case 'German':
        index(languageSwitchConfig.GER.index);
        setCurrency(languageSwitchConfig.GER.currency);
        break;
    }
  };
  return (
    <Select
      defaultValue={languagesConfig}
      options={languagesConfig}
      styles={styles}
      placeholder="Language"
      onChange={(e) => {
        handleChangeOfLanguage(e);
      }}
    />
  );
});

export default LanguageSelect;
