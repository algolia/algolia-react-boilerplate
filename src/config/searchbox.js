import { atom } from "recoil";

const searchBox = {
  placeholder: "Search",
  query: null,
};

export const searchBoxAtom = atom({
  key: "searchBoxAtom", // unique ID (with respect to other atoms/selectors)
  default: searchBox, // default value (aka initial value)
});
