import React from 'react';
// Algolia Import
import { VoiceSearch } from 'react-instantsearch-dom';

// Import Recoil
import { useRecoilState } from 'recoil';

// Import Config for recoil from file as a component
import { queryAtom } from '../../config/searchbox';

const VoiceSearchComponent = () => {
  const [queryState, setQueryState] = useRecoilState(queryAtom);
  return <VoiceSearch statusComponent={Status} />;
};

export default VoiceSearchComponent;

const Status = ({ transcript }) => {
  const [queryState, setQueryState] = useRecoilState(queryAtom);
  setQueryState(transcript);
  return null;
};
