import { connectStateResults } from 'react-instantsearch-dom'

import { useRecoilState } from 'recoil';

import { hitsAtom } from '../../config/results';


const areArraysEqual = (a, b) =>
  a.length === b.length &&
  a.every((v, i) => v === b[i]);


const StateResults = ({ searchResults }) => {
    const [hitsState, setHitsState] = useRecoilState(hitsAtom);
    if(searchResults?.hits) {
        // array of algolia hits
        let results = searchResults?.hits

        // if there are new results, and they are not equal to the results stored in state
        if(results?.length && !areArraysEqual(hitsState, results)) {
            // overwrite state with the new results
            setHitsState(searchResults.hits)
        }
    }
    return null
  };
  
const CustomStateResults = connectStateResults(StateResults);

export default CustomStateResults