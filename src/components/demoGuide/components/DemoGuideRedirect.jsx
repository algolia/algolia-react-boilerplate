import React from 'react';

import { Selectors } from '@/components/selector/Selectors';

// Import configuration
import { DemoGuideRedirectConfig } from '@/config/demoGuideConfig';

const DemoGuideRedirect = () => {
  return (
    <div className="demoGuideHelpers">
      <h3>Redirect</h3>
      <div className="demoGuideHelpers__infos">
        {DemoGuideRedirectConfig.map((item, i) => {
          return (
            <div key={i} className="demoGuideHelpers__infos__titles">
              <span>{item.label}:</span>
              <p>{item.details}</p>
            </div>
          );
        })}
      </div>
      <Selectors props={DemoGuideRedirectConfig} />
    </div>
  );
};

export default DemoGuideRedirect;
