import { useEffect, useState } from 'react';
// import { connectStateResults } from 'react-instantsearch-dom';
import { useInstantSearch } from 'react-instantsearch-hooks-web';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

// Used for avoiding duplicates
import { uniq } from 'lodash';

import useDebounce from '@/hooks/useDebounce';

import { isRulesSwitchToggle } from '@/config/appliedRulesConfig';

// Config import
import { mainIndex, searchClient } from '@/config/algoliaEnvConfig';
import { rulesAtom } from '@/config/appliedRulesConfig';
import { scorePersonadAtom } from '@/config/demoGuideConfig';
import { personaSelectedName } from '@/config/personaConfig';

//Import scope SCSS
import './SCSS/appliedRules.scss';

//Import PersonaScore Component
import PersonaScore from './PersonaScore';

function CustomAppliedRules(props) {
  const { results } = useInstantSearch(props);
  const [rules, setRules] = useRecoilState(rulesAtom);
  const [debounceRules, setDebounceRules] = useState([]);
  //Get score from Persona
  const resultsScore = useRecoilValue(scorePersonadAtom);
  const personaName = useRecoilValue(personaSelectedName);

  const setIsSwitchToggle = useSetRecoilState(isRulesSwitchToggle);

  // Init API request to get rules by their IDs
  const indexName = useRecoilValue(mainIndex);
  const index = searchClient.initIndex(indexName);

  // Get rules from Search result state
  // Store it in an array handled by recoil
  useEffect(() => {
    let rulesStorage = [];
    if (results?.appliedRules !== null) {
      let rulesApplied = results?.appliedRules;
      if (rulesApplied) {
        rulesApplied.map((rule) => {
          index.getRule(rule.objectID).then((e) => {
            rulesStorage.push(e.description);
            setRules((previousRules) => [...previousRules, e.description]);
          });
        });
      }
    }
  }, [results.appliedRules]);

  // Create an array without duplicates
  const uniqRules = uniq(rules);
  const debouncedRules = useDebounce(uniqRules, 500);
  console.log(debouncedRules);

  return (
    <div className="appliedRules">
      {debouncedRules.length > 0 ? (
        <div className="appliedRules__wp">
          <span
            className="appliedRules__closeBtn"
            onClick={() => setIsSwitchToggle(false)}
          >
            x
          </span>
          {resultsScore && personaName !== 'No Persona' && (
            <PersonaScore
              resultsScore={resultsScore}
              personaName={personaName}
            />
          )}
          <ul className="appliedRules__list">
            {debouncedRules.map((rule, i) => (
              <li key={i}>{rule}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="appliedRules__wp">
          <p className="appliedRules__noResult">No rules are applied</p>
        </div>
      )}
    </div>
  );
}

export default CustomAppliedRules;
