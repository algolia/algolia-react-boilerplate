import React from 'react';
import { useSetRecoilState } from 'recoil';

// Router import
import { useNavigate, createSearchParams } from 'react-router-dom';

import { queryAtom } from '@/config/searchboxConfig';
import { alertContent, isAlertOpen } from '@/config/demoGuideConfig';

// Import the Select widget (https://react-select.com/home)
import Select from 'react-select';

// Import configuration
import {
  DemoGuideDynamicFiltersConfig,
  styles,
} from '@/config/demoGuideConfig';

const DemoGuideDynamicFilters = () => {
  // Recoil State - update query in searchBar
  const setQueryState = useSetRecoilState(queryAtom);
  const setAlert = useSetRecoilState(alertContent);
  const setAlertOpen = useSetRecoilState(isAlertOpen);
  // router hook to navigate using a function
  const navigate = useNavigate();

  const triggerAlert = (content) => {
    setAlertOpen(true);
    setAlert(content);
    setTimeout(() => setAlertOpen(false), 5000);
  }
  
  return (
    <div className="search-terms">
      <h3>Dynamic Facet</h3>
      <div className="search-terms__infos">
        {DemoGuideDynamicFiltersConfig.map((item, i) => {
          return (
            <div key={i} className="search-terms__infos__titles">
              <span>{item.label}:</span>
              <p>{item.details}</p>
            </div>
          );
        })}
      </div>
      <Select
        defaultValue={DemoGuideDynamicFiltersConfig}
        options={DemoGuideDynamicFiltersConfig}
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
          }
        }}
      />
    </div>
  );
};

export default DemoGuideDynamicFilters;
