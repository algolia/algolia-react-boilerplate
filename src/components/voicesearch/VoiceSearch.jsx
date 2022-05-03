// This is for showing the voicesearch feature in the search bar

import { useEffect, memo } from 'react';
// Algolia Import
import { VoiceSearch } from 'react-instantsearch-dom';
// Import Recoil
import { useSetRecoilState } from 'recoil';
import { shouldHaveOpenFederatedSearch } from '@/config/federatedConfig';

// Import Config for recoil from file as a component
import { queryAtom } from '@/config/searchboxConfig';

const Status = ({ transcript, isListening }) => {
  const setIsFederatedOpen = useSetRecoilState(shouldHaveOpenFederatedSearch);
  const setQueryState = useSetRecoilState(queryAtom);
  useEffect(() => {
    setQueryState(transcript);
    isListening && setIsFederatedOpen(true);
  }, [setQueryState, transcript]);
  return null;
};

const VoiceSearchComponent = () => <VoiceSearch statusComponent={Status} />;

export default memo(VoiceSearchComponent);
