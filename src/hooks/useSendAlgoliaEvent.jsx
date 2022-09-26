import { insightsClient } from '@/config/algoliaEnvConfig';

const useSendAlgoliaEvent = (
  eventType,
  userToken,
  indexName,
  hit,
  eventName
) => {
  console.log('Hello', eventType, indexName, userToken);
  try {
    // insightsClient(eventType, {
    //   userToken: userToken,
    //   index: indexName,
    //   timestamp: '1664199799',
    //   eventName: eventName,
    //   objectIDs: [hit.objectID],
    // });
    insightsClient('clickedObjectIDs', {
      eventName: 'Add to basket',
      eventType: 'click',
      userToken: 'anonymous',
      index: indexName,
      timestamp: 1664200526673,
      objectIDs: [`${hit.objectID}`],
    });
  } catch (e) {
    console.log(e);
  }
};

export default useSendAlgoliaEvent;
