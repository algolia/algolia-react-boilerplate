import React from "react";
import Test from "./components/Test";

// RecoilState Management
// https://recoiljs.org/docs/introduction/getting-started
import { RecoilRoot } from "recoil";

// SCSS import
import "./scss/index.scss";

// Import Components

const App = () => {
  return (
    <RecoilRoot>
      <Test />
    </RecoilRoot>
  );
};

export default App;
