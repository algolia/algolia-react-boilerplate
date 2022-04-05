import React from 'react';
import { useSetRecoilState } from 'recoil';

// Router import
import { useNavigate, createSearchParams } from 'react-router-dom';

import { queryAtom } from '@/config/searchboxConfig';

// Import the Select widget (https://react-select.com/home)
import Select from 'react-select';

// Import configuration
import {
  DemoGuideInjectedContentInformations,
  DemoGuideInjectedContentConfig,
  styles,
} from '@/config/demoGuideConfig';

const DemoGuideInjectedContent = () => {
  // Recoil State - update query in searchBar
  const setQueryState = useSetRecoilState(queryAtom);
  // router hook to navigate using a function
  const navigate = useNavigate();
  return (
    <div className="search-terms">
      <h3>Injected Content</h3>
      <div className="search-terms__infos">
        {DemoGuideInjectedContentInformations.map((item) => {
          return (
            <div className="search-terms__infos__titles">
              <span>{item.span}:</span>
              <p>{item.details}</p>
            </div>
          );
        })}
      </div>
      <Select
        defaultValue={DemoGuideInjectedContentConfig}
        options={DemoGuideInjectedContentConfig}
        styles={styles}
        placeholder="Choose"
        onChange={(e) => {
          navigate({
            pathname: '/search',
            search: `?${createSearchParams({ query: e.value })}`,
          });
          setQueryState(e.value);
        }}
      />
    </div>
  );
};

export default DemoGuideInjectedContent;
