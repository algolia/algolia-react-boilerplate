import { memo } from 'react';

// Import the Select widget (https://react-select.com/home)
import Select from 'react-select';

// Import Recoil for state management
import { useSetRecoilState } from 'recoil';
import { queryAtom } from '@/config/searchboxConfig';
import { alertContent, isAlertOpen } from '@/config/demoGuideConfig';

// Router import
import { useNavigate, createSearchParams } from 'react-router-dom';

// Import configuration
import { searchBannersConfig, styles } from '@/config/demoGuideConfig';

import { categorySelectionAtom } from '@/config/headerConfig';

const SearchBanners = () => {
  // Recoil State - update query in searchBar
  const setQueryState = useSetRecoilState(queryAtom);
  // Recoil State - set the category to 'All'
  // LEFT IN FOR REFACTO PURPOSES
  // const setUnderlineCategory = useSetRecoilState(categorySelectionAtom);

  const setAlert = useSetRecoilState(alertContent);
  const setAlertOpen = useSetRecoilState(isAlertOpen);
  // router hook to navigate using a function
  const navigate = useNavigate();

  const triggerAlert = (content) => {
    setAlertOpen(true);
    setAlert(content);
    setTimeout(() => setAlertOpen(false), 5000);
  };

  return (
    <div className="search-terms">
      <h3>Banners Display</h3>
      <div className="search-terms__infos">
        {searchBannersConfig.map((item, i) => {
          return (
            <div key={i} className="search-terms__infos__titles">
              <span>{item.label}:</span>
              <p>{item.details}</p>
            </div>
          );
        })}
      </div>
      <Select
        defaultValue={searchBannersConfig}
        options={searchBannersConfig}
        styles={styles}
        placeholder="Choose"
        onChange={(e) => {
          if (e.value !== '') {
            navigate({
              pathname: '/search',
              search: `?${createSearchParams({ query: e.value })}`,
            });
            setQueryState(e.value);
            triggerAlert(e.alertContent);
            // set the Navigation category to 'All', which is at index 0
            // LEFT IN FOR REFACTO PURPOSES
            // setUnderlineCategory(0);
          }
        }}
      />
    </div>
  );
};

export default SearchBanners;
