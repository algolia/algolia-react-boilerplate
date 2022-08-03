import { Selectors } from '@/components/selector/Selectors';
//Import UseEffect
import { useEffect } from 'react';
// Import configuration
import {
  searchPersonaInformations,
  scorePersonadAtom,
} from '@/config/demoGuideConfig';

import { personaConfig, personaSelectedAtom } from '@/config/personaConfig';
//import API Keys, ...
import { searchClientCreds } from '@/config/algoliaEnvConfig';
//Recoil to display ot not persona
import { useRecoilValue, useSetRecoilState } from 'recoil';
// Import Recoil config
import { shouldHavePersona } from '@/config/featuresConfig';

const SearchPersona = () => {
  //Recoil to display ot not persona
  const shouldShowPersonasAtom = useRecoilValue(shouldHavePersona);
  const selectedUserToken = useRecoilValue(personaSelectedAtom);
  //Call recoil state to set it with fetching results
  const setScorePersona = useSetRecoilState(scorePersonadAtom);
  console.log(selectedUserToken);
  useEffect(() => {
    if (shouldShowPersonasAtom && selectedUserToken !== 'anon') {
      //Fetch Algolia results API for Persona
      const url = `https://personalization.eu.algolia.com/1/profiles/personalization/elizabeth_aniston?X-Algolia-API-Key=${searchClientCreds.recommendApi}&X-Algolia-Application-Id=${searchClientCreds.appID}`;
      const fetchData = async () => {
        try {
          const response = await fetch(url);
          const json = await response.json();
          setScorePersona(json);
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
