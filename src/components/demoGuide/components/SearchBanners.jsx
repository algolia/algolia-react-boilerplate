import { Selectors } from '@/components/selector/Selectors';

// Import configuration
import { searchBannersConfig } from '@/config/demoGuideConfig';

const SearchBanners = () => {
  return (
    <div className="demoGuideHelpers">
      <h3>Banners Display</h3>
      <div className="demoGuideHelpers__infos">
        {searchBannersConfig.map((item, i) => {
          return (
            <div key={i} className="demoGuideHelpers__infos__titles">
              <span>{item.label}:</span>
              <p>{item.details}</p>
            </div>
          );
        })}
      </div>
      <Selectors props={searchBannersConfig} />
    </div>
  );
};

export default SearchBanners;
