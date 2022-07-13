import React from 'react';

import { Selectors } from '@/components/selector/Selectors';

// Import configuration
import { DemoGuideDynamicFiltersConfig } from '@/config/demoGuideConfig';

const DemoGuideDynamicFilters = () => {
  return (
    <div className="demoGuideHelpers">
      <h3>Dynamic Facet</h3>
      <div className="demoGuideHelpers__infos">
        {DemoGuideDynamicFiltersConfig.map((item, i) => {
          return (
            <div key={i} className="demoGuideHelpers__infos__titles">
              <span>{item.label}:</span>
              <p>{item.details}</p>
            </div>
          );
        })}
      </div>
      <Selectors props={DemoGuideDynamicFiltersConfig} />
    </div>
  );
};

export default DemoGuideDynamicFilters;
