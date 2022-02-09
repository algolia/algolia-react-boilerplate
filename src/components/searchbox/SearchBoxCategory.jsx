// This SearchBox more complex than the simple
// they have like classic one glass etc... but with another field => an other placeholder
// you can personalise and display for example category
import React from 'react';
// Algolia Import
import { connectSearchBox } from 'react-instantsearch-dom';
// Import Recoil
import { useRecoilState } from 'recoil';

// Import Config for recoil from file as a component and the new
import { Glass } from '../../assets/svg/SvgIndex';
import {
  queryAtom,
  simplePlaceholderAtom,
  customPlaceholderAtom,
} from '../../config/searchbox';
// Import SVG from file as a component

const SearchBoxCategory = ({ refine }) => {
  // State for the SearchBox
  const [queryState, setQueryState] = useRecoilState(queryAtom);
  const [simplePlaceholder] = useRecoilState(simplePlaceholderAtom);
  const [customPlaceholder] = useRecoilState(customPlaceholderAtom);

  return (
    <div className="searchbox-custom">
      <form
        className="searchbox-custom__form"
        action=""
        role="search"
        autoComplete="off"
        onSubmit={(event) => {
          event.preventDefault();
          setQueryState(event.target.value);
        }}
      >
        <input
          className="searchbox-custom__form__input"
          type="search"
          placeholder={simplePlaceholder}
          onChange={(event) => {
            setQueryState(event.target.value);
            refine(event.currentTarget.value);
          }}
        />
        <div className="searchbox-custom__placeholder">
          <p>{customPlaceholder}</p>
          <Glass />
        </div>
      </form>
    </div>
  );
};

const CustomSearchBoxCategory = connectSearchBox(SearchBoxCategory);

export default CustomSearchBoxCategory;
