import React from "react";

// Recoil
import { atom, useRecoilState, selector, useRecoilValue } from "recoil";

const Page2 = () => {
  const [optionnal, setOptionnal] = useRecoilState(optionnalTest);
  const thirdLevelValue = optionnal?.firstLevel?.secondLevel?.thirdLevel;
  return (
    <div>
      <p>Page 2 // {thirdLevelValue}</p>
    </div>
  );
};

export default Page2;

const optionnalTest = atom({
  key: "optionnalTest", // unique ID (with respect to other atoms/selectors)
  default: {
    firstLevel: {
      secondLevel: {
        thirdLevel: "value",
      },
    },
  }, // default value (aka initial value)
});
