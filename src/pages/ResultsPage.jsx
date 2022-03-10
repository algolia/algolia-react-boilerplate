// Recoil state to directly access results
import { useRecoilState } from 'recoil';
import { hitsAtom } from '../config/results';

// Import the default hits widget from IS
import { Hits } from 'react-instantsearch-dom';

const ResultsPage = () => {
  // If we need to, we can directly access hits from here
  const [hitsState] = useRecoilState(hitsAtom);

  return (
    <div>
      {/* Hits Uses IS state, not our own, to render widgets */}
      {/* Render the hits component */}
      <Hits />
    </div>
  );
};

export default ResultsPage;
