// For displaying the select widget for choosing a segment

import { memo } from 'react';

// Import the Select widget (https://react-select.com/home)
import Select from 'react-select';

// Import Recoil for state management
import { useSetRecoilState } from 'recoil';

// Import configuration
import {
  segmentConfig,
  segmentSelectedAtom,
  styles,
} from '@/config/segmentConfig';

const SelectSegment = () => {
  const setSegmentSelect = useSetRecoilState(segmentSelectedAtom);

  // When the segment is selected, set it to be the selected segment in the Recoil state
  return (
    <Select
      defaultValue={segmentConfig}
      options={segmentConfig}
      styles={styles}
      placeholder="Persona"
      classNamePrefix="react-select"
      onChange={(e) => {
        setSegmentSelect(e.value);
      }}
    />
  );
};

export default memo(SelectSegment);