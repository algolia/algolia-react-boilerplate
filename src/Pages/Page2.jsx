import React from "react";

// Recoil
import { atom, useRecoilState, selector, useRecoilValue } from "recoil";
import SearchBoxSimple from "../components/searchbox/SearchBoxSimple";

const Page2 = () => {
  const [optional, setOptional] = useRecoilState(optionalTest);
  const thirdLevelValue = optional?.firstLevel?.secondLevel?.thirdLevel;
  return (
    <div>
      <p>Page 2 // {thirdLevelValue}</p>
      <div className="search-box-container">
        <SearchBoxSimple />
      </div>
    </div>
  );
};

export default Page2;

const optionalTest = atom({
  key: "optionalTest", // unique ID (with respect to other atoms/selectors)
  default: {
    firstLevel: {
      secondLevel: {
        thirdLevel: "value",
      },
    },
  }, // default value (aka initial value)
});
