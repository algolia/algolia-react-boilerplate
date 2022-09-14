import { insightsClient } from '@/config/algoliaEnvConfig'

const useSendAlgoliaEvent = (eventType, userToken, indexName, hit, eventName) => {
  try {
    insightsClient(eventType, {
      userToken: userToken,
      index: indexName,
      eventName: eventName,
      objectIDs: [hit.objectID]
    });
  } catch(e) {
    console.log(e);
  }
}

export default useSendAlgoliaEvent