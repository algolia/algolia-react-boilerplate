import { Selectors } from '@/components/selector/Selectors';
//Import UseEffect
import { useEffect } from 'react';
// Import configuration
import {
  scorePersonadAtom,
  searchPersonaInformations,
} from '@/config/demoGuideConfig';

import { personaConfig, personaSelectedAtom } from '@/config/personaConfig';
//import API Keys, ...
import { searchClientCreds } from '@/config/algoliaEnvConfig';
//Recoil to display ot not persona
import { useRecoilValue, useSetRecoilState } from 'recoil';
// Import Recoil config
import { shouldHavePersona } from '@/config/featuresConfig';

import { isPersonnaEventToggle } from '@/config/demoGuideConfig';

//Recoil states & values
import { useRecoilState } from 'recoil';

const SearchPersona = () => {
  //Recoil to display ot not persona
  const shouldShowPersonasAtom = useRecoilValue(shouldHavePersona);
  //Get userToken of persona
  const selectedUserToken = useRecoilValue(personaSelectedAtom);
  //Call recoil state to set it with fetching results
  const setScorePersona = useSetRecoilState(scorePersonadAtom);
  const [isSwitchToggle, setIsSwitchToggle] = useRecoilState(
    isPersonnaEventToggle
  );
  useEffect(() => {
    if (shouldShowPersonasAtom && selectedUserToken !== 'anon') {
      //Fetch Algolia results API for Persona
      const url = `https://personalization.eu.algolia.com/1/profiles/personalization/${selectedUserToken}?X-Algolia-API-Key=${searchClientCreds.recommendApi}&X-Algolia-Application-Id=${searchClientCreds.appID}`;
      const fetchData = async () => {
        try {
          const response = await fetch(url);
          const json = await response.json();
          setScorePersona(json.scores);
        } catch (error) {
          console.log('error', error);
        }
      };
      fetchData();
    }
  }, [selectedUserToken]);
  return (
    <div className="demoGuideHelpers">
      <h3>Search Persona</h3>
      <div className="demoGuideHelpers__infos__titles">
        <p className="demoGuideHelpers__infos__title">
          Did you use event to send persona ?
        </p>
      </div>
      <div className="appliedRules__toggle">
        <label className="switch">
          <input
            type="checkbox"
            checked={isSwitchToggle}
            onChange={(e) => {
              setIsSwitchToggle(!isSwitchToggle);
            }}
          />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="demoGuideHelpers__infos">
        {searchPersonaInformations.map((item, i) => {
          return (
            <div key={i} className="demoGuideHelpers__infos__titles">
              <span>{item.span}:</span>
              <p>{item.details}</p>
            </div>
          );
        })}
      </div>
      <Selectors props={personaConfig} />
    </div>
  );
};

export default SearchPersona;
