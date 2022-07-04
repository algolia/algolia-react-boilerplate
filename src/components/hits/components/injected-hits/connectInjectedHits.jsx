// This component is used in the creation of injected hits,
// ...eg a Sales Card in the Search Results

// import connector tool from Algolia
import { createConnector } from 'react-instantsearch-core';

export const connectInjectedHits = createConnector({
  displayName: 'InjectedHits',
  getProvidedProps(props, _, searchResults) {
    const { slots, hits, hitComponent, contextValue } = props;

    const { mainTargetedIndex } = contextValue;
    const results = searchResults.results || [];
    const isSingleIndex = Array.isArray(results.hits);

    const resultsByIndex = isSingleIndex
      ? { [mainTargetedIndex]: { ...results, hits } }
      : Object.entries(results).reduce((acc, [indexName, indexResults]) => {
        const isMainIndex = indexName === mainTargetedIndex;

        return {
          ...acc,
          [indexName]: isMainIndex ? { ...indexResults, hits } : indexResults,
        };
      }, {});

    const mainIndexHits = resultsByIndex[mainTargetedIndex]
      ? resultsByIndex[mainTargetedIndex].hits || []
      : [];

    const injectedHits = mainIndexHits
      .map((hit, position) => {
        const hitFromMainIndex = {
          type: 'item',
          props: { hit },
          Hit: hitComponent,
        };
        return slots({ resultsByIndex })
          .reverse()
          .reduce(
            (acc, { injectAt, getHits = () => [null], slotComponent }) => {
              const slotScopeProps = { position, resultsByIndex };
              const shouldInject =
                typeof injectAt === 'function'
                  ? injectAt({
                    ...slotScopeProps,
                    hit,
                  })
                  : position === injectAt;

              if (!shouldInject) {
                return acc;
              }

              const hitsFromSlotIndex = getHits({
                ...slotScopeProps,
                hit,
              });

              return [
                ...hitsFromSlotIndex.map((hitFromSlotIndex) => ({
                  type: 'injected',
                  props: {
                    ...slotScopeProps,
                    hit: hitFromSlotIndex,
                  },
                  Hit: slotComponent,
                })),
                ...acc,
              ];
            },
            [hitFromMainIndex]
          );
      })
      .flat();

    return {
      injectedHits,
    };
  },
});
