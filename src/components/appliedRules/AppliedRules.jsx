import { useEffect } from 'react';
import { connectStateResults } from 'react-instantsearch-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

// Used for avoiding duplicates
import { uniq } from 'lodash';

import { queryAtom } from '@/config/searchboxConfig';

// Config import
import { mainIndex, searchClient } from '@/config/algoliaEnvConfig';
import { rulesAtom } from '@/config/appliedRulesConfig';

const AppliedRules = ({ searchResults }) => {
  const [rules, setRules] = useRecoilState(rulesAtom);

  const query = useRecoilValue(queryAtom);

  // Init API request to get rules by their IDs
  const indexName = useRecoilValue(mainIndex);
  const index = searchClient.initIndex(indexName);

  // Get rules from Search result state
  // Store it in an array handled by recoil
  useEffect(() => {
    setRules([]);
    if (searchResults?.appliedRules !== null) {
      let rules = searchResults?.appliedRules;
      rules?.map((rule) => {
        index.getRule(rule.objectID).then((e) => {
          setRules((previousRules) => [...previousRules, e.description]);
        });
      });
    }
  }, [searchResults.appliedRules]);
  // Create an array without duplicates
  const uniqRules = uniq(rules);

  return (
    <div className="appliedRules">
      <ul className="appliedRules__list">
        {uniqRules.map((rule, i) => (
          <li key={i}>{rule}</li>
        ))}
      </ul>
    </div>
  );
};

const CustomAppliedRules = connectStateResults(AppliedRules);

export default CustomAppliedRules;
