// This is for controlling the hits in Recoil state
import { uniq } from 'lodash';
import { useEffect, useState } from 'react';
import { connectStateResults } from 'react-instantsearch-dom';
import { mainIndex, searchClient } from '@/config/algoliaEnvConfig';
import { rulesAtom } from '@/config/appliedRulesConfig';

import { useRecoilState, useRecoilValue } from 'recoil';

import { hitsAtom } from '@/config/hitsConfig';

// Update the state if there's new results
function AppliedRules({ searchResults }) {
  const [rules, setRules] = useRecoilState(rulesAtom);
  const indexName = useRecoilValue(mainIndex);
  const index = searchClient.initIndex(indexName);
  useEffect(() => {
    if (searchResults?.appliedRules !== null) {
      let rules = searchResults?.appliedRules;
      rules?.map((rule) => {
        index.getRule(rule.objectID).then((e) => {
          console.log(e);
          setRules((previousRules) => [...previousRules, e.description]);
        });
      });
    } else null;
  }, [searchResults]);

  const uniqRules = uniq(rules);

  return (
    <div className="appliedRules">
      <ul className="appliedRules__list">
        {uniqRules.map((rule) => (
          <li>{rule}</li>
        ))}
      </ul>
    </div>
  );
}

const CustomAppliedRules = connectStateResults(AppliedRules);

export default CustomAppliedRules;
