import React from 'react';

import { Selectors } from '@/components/selector/Selectors';

// Import configuration
import { DemoGuideInjectedContentConfig } from '@/config/demoGuideConfig';

const DemoGuideInjectedContent = () => {
  return (
    <div className="demoGuideHelpers">
      <h3>Injected Content</h3>
      <div className="demoGuideHelpers__infos">
        {DemoGuideInjectedContentConfig.map((item, i) => {
          return (
            <div key={i} className="demoGuideHelpers__infos__titles">
              <span>{item.label}:</span>
              <p>{item.details}</p>
            </div>
          );
        })}
      </div>
      <Selectors props={DemoGuideInjectedContentConfig} />
    </div>
  );
};

export default DemoGuideInjectedContent;
