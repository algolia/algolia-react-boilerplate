import React, { useEffect } from 'react';
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

const VoiceSearchComponent = () => {
  return <VoiceSearch statusComponent={Status} />;
};

export default VoiceSearchComponent;
