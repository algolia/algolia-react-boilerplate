// This component is used in the creation of injected hits,
// ...eg a Sales Card in the Search Results

// import connector tool from Algolia
import { useConnector } from 'react-instantsearch-hooks-web';

export function connectInjectedHits(props) {
  displayName: 'InjectedHits',
  getProvidedProps(props, _, searchResults){
    const { slots, hits, hitComponent, contextValue } = props;
    console.log(slots)
  }
  return {InjectedHits};
}
