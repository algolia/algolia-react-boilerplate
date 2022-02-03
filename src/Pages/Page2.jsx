import React from "react";

// Recoil
import { atom, useRecoilState, selector, useRecoilValue } from "recoil";

const Page2 = () => {
  const [optional, setOptional] = useRecoilState(optionalTest);
  const thirdLevelValue = optional?.firstLevel?.secondLevel?.thirdLevel;
  return (
    <div>
      <p>Page 2 // {thirdLevelValue}</p>
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
