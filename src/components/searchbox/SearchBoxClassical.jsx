// This SearchBox is with a glass inside
// but classical

import React from "react";

const SearchBoxClassical = () => {
  return (
    <div className="searchbox-classical">
      <form
        className="searchbox-classical__form"
        action=""
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
        }}
        autoComplete="off"
      >
        <input
          className="searchbox-classical__form__input"
          type="search"
          onChange={(event) => {
            console.log(e);
          }}
          placeholder="Suit, dress..."
        />
      </form>
    </div>
  );
};

export default SearchBoxClassical;
