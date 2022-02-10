import React from 'react';
// Recoil
import { useRecoilState } from 'recoil';
import { hitsAtom } from '../config/results';

import { Hits } from 'react-instantsearch-dom';

const ResultsPage = () => {
  const [hitsState] = useRecoilState(hitsAtom);

  console.log(hitsState)
  return (
    <div>
      <p>Results Page //</p>
      <Hits />
    </div>
  );
};

export default ResultsPage;
