import React from 'react';

// Recoil state to directly access results
import { useRecoilState } from 'recoil';
import { hitsAtom } from '../config/results';

// Import the default hits widget from IS
import { Hits } from 'react-instantsearch-dom';

const ResultsPage = () => {
  // If we need to, we can directly access hits from here
  const [hitsState] = useRecoilState(hitsAtom);
  console.log(hitsState);

  return (
    <div>
      // Hits Uses IS state, not our own, to render widgets
      <Hits />
    </div>
  );
};

export default ResultsPage;
