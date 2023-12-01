import { useRecoilValue } from 'recoil'
import { personaObjectSelectedAtom } from './personaConfig'

import aa from 'search-insights'
import { createInsightsMiddleware } from 'instantsearch.js/es/middlewares'
import { useLayoutEffect } from 'react'
import { useInstantSearch } from 'react-instantsearch'

export function InsightsMiddleware() {
  const { addMiddlewares } = useInstantSearch()
  const persona = useRecoilValue(personaObjectSelectedAtom)

  useLayoutEffect(() => {
    const middleware = createInsightsMiddleware({
      insightsClient: aa,
    })

    // Get the user token (synchronously or asynchronously).
    const userToken =
      persona.value === 'anon' ? 'anonymous-user' : persona.value
    // The `insights` middleware receives a notification
    // and attaches the `userToken` to search calls onwards.
    aa('setUserToken', userToken)

    return addMiddlewares(middleware)
  }, [addMiddlewares])

  return null
}
