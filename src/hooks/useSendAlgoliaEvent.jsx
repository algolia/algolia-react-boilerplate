// import { insightsClient } from '@/config/algoliaEnvConfig';

const useSendAlgoliaEvent = ({ type, userToken, index, hit, name }) => {
  try {
    insightsClient('clickedObjectIDs', {
      eventName: name,
      eventType: type,
      userToken: userToken,
      index: index,
      timestamp: Date.now(),
      objectIDs: [`${hit.objectID}`],
    })
  } catch (e) {
    console.log(e)
  }
}

// export default useSendAlgoliaEvent;
