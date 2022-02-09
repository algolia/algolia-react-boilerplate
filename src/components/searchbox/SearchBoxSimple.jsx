// This SearchBox is with a glass inside
// but simple it means with only a glass simple effect
import React from 'react';
// Import Recoil
import { useRecoilState } from 'recoil';

// Import SVG from file as a component
import Glass from '../../assets/svg/Glass';
// Import Config for recoil from file as a component
import { queryAtom, simplePlaceholderAtom } from '../../config/searchbox';

const SearchBoxSimple = () => {
  // State for the SearchBox
  const [setQueryState] = useRecoilState(queryAtom);
  const [simplePlaceholder] = useRecoilState(simplePlaceholderAtom);

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
