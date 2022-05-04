// This is for controlling the hits in Recoil state

import { useEffect } from 'react';
import { connectStateResults } from 'react-instantsearch-dom';
import { mainIndex, searchClient } from '@/config/algoliaEnvConfig';
import { queryAtom } from '@/config/searchboxConfig';

import { useRecoilState, useRecoilValue } from 'recoil';

import { hitsAtom } from '@/config/hitsConfig';

// Update the state if there's new results
function AppliedRules({ searchResults }) {
  const indexName = useRecoilValue(mainIndex);
  const index = searchClient.initIndex(indexName);
  console.log(index);
  useEffect(() => {
    if (searchResults?.appliedRules !== null) {
      let rules = searchResults?.appliedRules;
      rules?.map((rule) => {
        console.log(typeof rule.objectID);
        index.getRule(rule.objectID).then((e) => {
          console.log(e);
        });
      });
    } else null;
  }, [searchResults]);

  return null;
}

const CustomAppliedRules = connectStateResults(AppliedRules);

export default CustomAppliedRules;
