// This is for showing the voicesearch feature in the search bar

import { useEffect, memo } from 'react';
// Algolia Import
import { VoiceSearch } from 'react-instantsearch-dom';
// Import Recoil
import { useSetRecoilState } from 'recoil';

// Import Config for recoil from file as a component
import { queryAtom } from '../../config/searchbox';

const Status = ({ transcript }) => {
  const setQueryState = useSetRecoilState(queryAtom);
  useEffect(() => {
    setQueryState(transcript);
  }, [setQueryState, transcript]);
  return null;
};

const VoiceSearchComponent = () => <VoiceSearch statusComponent={Status} />;

export default memo(VoiceSearchComponent);
