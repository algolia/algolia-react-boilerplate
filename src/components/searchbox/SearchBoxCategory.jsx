import React from "react";

// Import Recoil
// &&
// application state from config file
import {
  queryAtom,
  simplePlaceholderAtom,
  customPlaceholderAtom,
} from "../../config/searchbox";
import { useRecoilState } from "recoil";

const SearchBoxCategory = () => {
  // State for the SearchBox
  const [query, setQueryState] = useRecoilState(queryAtom);
  const [simplePlaceholder, setSimplePlaceholderState] = useRecoilState(
    simplePlaceholderAtom
  );
  const [customPlaceholder, setCustomPlaceholderState] = useRecoilState(
    customPlaceholderAtom
  );

  return (
    <div className="searchbox-custom">
      <form
        className="searchbox-custom__form"
        action=""
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          setQueryState(event.target.value);
        }}
        autoComplete="off"
      >
        <input
          className="searchbox-custom__form__input"
          type="search"
          onChange={(event) => {
            setQueryState(event.target.value);
          }}
          placeholder={simplePlaceholder}
        />
        <div className="searchbox-custom__placeholder">
          <p>{customPlaceholder}</p>
          <img src={`../assets/svg/glass.svg`} alt="" />
        </div>
      </form>
    </div>
  );
};

export default SearchBoxCategory;
