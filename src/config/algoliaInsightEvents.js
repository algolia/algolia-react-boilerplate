import { atom, selector, useRecoilValue } from 'recoil';
import { personaSelectedAtom } from './personaConfig';

import aa from 'search-insights';
import { createInsightsMiddleware } from 'instantsearch.js/es/middlewares';
import { useLayoutEffect } from 'react';
import { useInstantSearch } from 'react-instantsearch-hooks-web';

// const personaSelected = selector({
//   key: 'PersonaSelected',
//   get: ({get}) => get(personaSelectedAtom)
// });

export function InsightsMiddleware() {
  const { use } = useInstantSearch();
  const user = useRecoilValue(personaSelectedAtom)
  
  useLayoutEffect(() => {
    
    const middleware = createInsightsMiddleware({
      insightsClient: aa,
    });

    const userToken = user === 'anonymous-user' ? 'anonymous-user' : user ; // Get the user token (synchronously or asynchronously).
    // The `insights` middleware receives a notification
    // and attaches the `userToken` to search calls onwards.
    aa('setUserToken', userToken);

    return use(middleware);
  }, [use]);

  return null;
}

