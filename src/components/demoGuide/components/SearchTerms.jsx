import { Selectors } from '@/components/selector/Selectors';

// Import configuration
import { searchTermsConfig } from '@/config/demoGuideConfig';

const SearchTerms = () => {
  return (
    <div className="demoGuideHelpers">
      <h3>Search Terms</h3>
      <div className="demoGuideHelpers__infos">
        {searchTermsConfig.map(
          (item, i) =>
            item.details && (
              <div key={i} className="demoGuideHelpers__infos__titles">
                <span>{item.label}:</span>
                <p>{item.details}</p>
              </div>
            )
        )}
      </div>
      <Selectors props={searchTermsConfig} />
    </div>
  );
};

export default SearchTerms;
