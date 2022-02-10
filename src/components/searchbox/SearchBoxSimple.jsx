// This SearchBox is with a glass inside
// but simple it means with only a glass simple effect
import debounce from 'lodash.debounce';
import React, { useCallback } from 'react';
// Import Debounce
// Algolia Import
import { connectSearchBox } from 'react-instantsearch-dom';
// Import Recoil
import { useRecoilState } from 'recoil';

// Import SVG from file as a component
import { Glass } from '../../assets/svg/SvgIndex';
// Import Config for recoil from file as a component
import { queryAtom, simplePlaceholderAtom } from '../../config/searchbox';

const SearchBoxSimple = ({ refine }) => {
  const [queryState, setQueryState] = useRecoilState(queryAtom);
  const refineFunction = (event) => {
    setQueryState(event);
    refine(event);
  };
  // State for the SearchBox

  const [simplePlaceholder] = useRecoilState(simplePlaceholderAtom);
  // Debounce during search if you want to change the reactivity change number 250
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedRefine = useCallback(debounce(refineFunction, 250), []);
  return (
    <div className="searchbox-simple">
      <form
        className="searchbox-simple__form"
        action=""
        role="search"
        value={queryState}
        autoComplete="off"
        onSubmit={(event) => {
          event.preventDefault();
          setQueryState(event.target.value);
        }}
      >
        <input
          className="searchbox-simple__form__input"
          type="search"
          placeholder={simplePlaceholder}
          onChange={(event) => {
            debouncedRefine(event.currentTarget.value);
          }}
        />
        <Glass />
      </form>
    </div>
  );
};

const CustomSearchBoxSimple = connectSearchBox(SearchBoxSimple);

export default CustomSearchBoxSimple;
