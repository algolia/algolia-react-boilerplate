// This SearchBox is with a glass inside
// but simple it means with only a glass simple effect
import React from 'react';
// Import Recoil
import { useRecoilState, useSetRecoilState } from 'recoil';

// Import SVG from file as a component
import { Glass } from '../../assets/svg/SvgIndex';
// Import Config for recoil from file as a component
import { queryAtom, simplePlaceholderAtom } from '../../config/searchbox';

import { isFederatedAtom } from '../../config/config';

const SearchBoxSimple = () => {
  // State for the SearchBox
  const [setQueryState] = useRecoilState(queryAtom);
  const [simplePlaceholder] = useRecoilState(simplePlaceholderAtom);
  const setIsFederated = useSetRecoilState(isFederatedAtom);

  return (
    <div className="searchbox-simple">
      <form
        className="searchbox-simple__form"
        action=""
        role="search"
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
          onClick={() => setIsFederated(true)}
          onChange={(event) => {
            setQueryState(event.target.value);
          }}
        />
        <Glass />
      </form>
    </div>
  );
};

export default SearchBoxSimple;
