import { useEffect } from 'react';
// import { connectStateResults } from 'react-instantsearch-dom';
import { useInstantSearch } from 'react-instantsearch-hooks-web';

import { useRecoilState, useRecoilValue } from 'recoil';

// Used for avoiding duplicates
import { uniq } from 'lodash';

// Config import
import { mainIndex, searchClient } from '@/config/algoliaEnvConfig';
import { rulesAtom } from '@/config/appliedRulesConfig';

//Import scope SCSS
import './SCSS/appliedRules.scss';

function CustomAppliedRules(props) {
  const { results } = useInstantSearch(props);
  const [rules, setRules] = useRecoilState(rulesAtom);
  // Init API request to get rules by their IDs
  const indexName = useRecoilValue(mainIndex);
  const index = searchClient.initIndex(indexName);

  // Get rules from Search result state
  // Store it in an array handled by recoil
  useEffect(() => {
    let rulesStorage = [];
    if (results?.appliedRules !== null) {
      let rulesApplied = results?.appliedRules;
      rulesApplied?.map((rule) => {
        index.getRule(rule.objectID).then((e) => {
          rulesStorage.push(e.description);
          let mergedRules = [...rulesStorage, e.description];
          setRules(mergedRules);
          // setRules((previousRules) => [...previousRules, e.description]);
        });
      });
    }
  }, [results.appliedRules, setRules]);

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
}

export default CustomAppliedRules;
