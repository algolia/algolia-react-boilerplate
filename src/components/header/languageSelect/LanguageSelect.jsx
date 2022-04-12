import { memo } from 'react';

// Import the Select widget (https://react-select.com/home)
import Select from 'react-select';

// Import Recoil for state management
import { useSetRecoilState } from 'recoil';

// Import configuration
import { languagesConfig, styles } from '@/config/languagesConfig';

import { LanguageSelectedAtom } from '@/config/languagesConfig';

const LanguageSelect = memo(() => {
  // When language is selected it is shared all across the app
  const setLanguage = useSetRecoilState(LanguageSelectedAtom);

  return (
    <Select
      defaultValue={languagesConfig}
      options={languagesConfig}
      styles={styles}
      placeholder="Language"
      onChange={(e) => {
        setLanguage(e.value);
      }}
    />
  );
});

export default LanguageSelect;
