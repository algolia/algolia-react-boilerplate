import { memo } from 'react';

// Import the Select widget (https://react-select.com/home)
import Select from 'react-select';

// Import Recoil for state management
import { useSetRecoilState } from 'recoil';
import { alertContent, isAlertOpen } from '@/config/demoGuideConfig';

// Router import
import { useNavigate } from 'react-router-dom';

// Import configuration
import {
  searchSegmentConfig,
  styles,
  searchSegmentInformations,
} from '@/config/demoGuideConfig';

import { segmentSelectedAtom } from '@/config/segmentConfig';

const SearchSegments = () => {
  // Recoil State - update query in searchBar
  const setSegmentSelect = useSetRecoilState(segmentSelectedAtom);
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
      <h3>Search with Segments</h3>
      <div className="search-terms__infos">
        {searchSegmentInformations.map((item, i) => {
          return (
            <div key={i} className="search-terms__infos__titles">
              <span>{item.span}:</span>
              <p>{item.details}</p>
            </div>
          );
        })}
      </div>
      <Select
        defaultValue={searchSegmentConfig}
        options={searchSegmentConfig}
        styles={styles}
        placeholder="Persona"
        onChange={(e) => {
          if (e.value !== 'anon') {
            setSegmentSelect(e.value);
            triggerAlert(e.alertContent);
          }
        }}
      />
    </div>
  );
};

export default SearchSegments;
