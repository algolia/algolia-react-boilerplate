// This SearchBox is with a glass inside
// but simple

import React, { useEffect } from 'react';

// Import Recoil
// &&
// application state from config file
import { queryAtom, simplePlaceholderAtom } from '../../config/searchbox';
import { useRecoilState } from 'recoil';

// Import SVG
import Glass from '../../assets/svg/Glass';

export default function SearchBoxSimple() {
  // State for the SearchBox
  const [query, setQueryState] = useRecoilState(queryAtom);
  const [simplePlaceholder, setSimplePlaceholderState] = useRecoilState(
    simplePlaceholderAtom
  );

  return (
    <div className="searchbox-simple">
      <form
        className="searchbox-simple__form"
        action=""
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          setQueryState(event.target.value);
        }}
        autoComplete="off"
      >
        <input
          className="searchbox-simple__form__input"
          type="search"
          onChange={(event) => {
            setQueryState(event.target.value);
          }}
          placeholder={simplePlaceholder}
        />
        <Glass />
      </form>
    </div>
  );
}
