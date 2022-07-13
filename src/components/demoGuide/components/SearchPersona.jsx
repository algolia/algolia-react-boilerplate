import { Selectors } from '@/components/selector/Selectors';

// Import configuration
import { searchPersonaInformations } from '@/config/demoGuideConfig';

import { personaConfig } from '@/config/personaConfig';

const SearchPersona = () => {
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
