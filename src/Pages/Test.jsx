import React from "react";

// React router
import { Link } from "react-router-dom";

import { atom, useRecoilState, selector, useRecoilValue } from "recoil";

// application state from config file
import { configAtom } from "../config/config";


const Test = () => {
  // access config state and log for testing
  const [config] = useRecoilState(configAtom);
  console.log(config)

  return (
    <div>
      <TextInput />
      <CharacterCount />
      <br />
      <Link to="/page2">Page2</Link>
    </div>
  );
};

export default Test;

// An atom represents a piece of state. Atoms can be read from and written to from any component.
// Components that read the value of an atom are implicitly subscribed to that atom, so any atom updates will result in a re-render of all components subscribed to that atom:
const textState = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

// A selector represents a piece of derived state. Derived state is a transformation of state.
// You can think of derived state as the output of passing state to a pure function that modifies the given state in some way:
const charCountState = selector({
  key: "charCountState", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const text = get(textState);
    return text.length;
  },
});

function TextInput() {
  const [text, setText] = useRecoilState(textState);

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="test-class">
      <input type="text" value={text} onChange={onChange} />
      <br />
      <p className="test-p"> Echo: {text}</p>
    </div>
  );
}

function CharacterCount() {
  const count = useRecoilValue(charCountState);

  return <>Character Count: {count}</>;
}
