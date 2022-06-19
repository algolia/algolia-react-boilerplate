// This is for controlling the hits in Recoil state

import { useEffect } from 'react';
import { connectStateResults } from 'react-instantsearch-dom';

import { useRecoilState } from 'recoil';

import { hitsAtom } from '@/config/hitsConfig';
import { refinementsAtom } from "@/config/refinementsConfig";

// Check that the arrays of hits are identical
const areArraysEqual = (a, b) =>
  a.length === b.length && a.every((v, i) => v === b[i]);

// Update the state if there's new results
function StateResults({ searchResults, searchState }) {
  const [hitsState, setHitsState] = useRecoilState(hitsAtom);
  const [refinementsState, setRefinementsState] = useRecoilState(refinementsAtom)

  useEffect(() => {
    let refinements = searchState?.refinementList
    if (refinements
      // && !areArraysEqual(refinementsState, refinements)
    ) {
      setRefinementsState(refinements)
    }
  }, [searchState])

  useEffect(() => {
    if (searchResults?.hits) {
      // array of algolia hits
      let results = searchResults?.hits;

      // if there are new results, and they are not equal to the results stored in state
      if (results?.length && !areArraysEqual(hitsState, results)) {
        // overwrite state with the new results
        setHitsState(searchResults.hits);
      }
    }
  }, [searchResults]);
  return null;
}

const CustomStateResults = connectStateResults(StateResults);

export default CustomStateResults;
