import { atom } from "recoil";

export const linksHeader = atom({
  key: "linksHeader", // unique ID (with respect to other atoms/selectors)
  default: [
    {
      link: "Mens",
      url: "/mens",
    },
    {
      link: "Womens",
      url: "/womens",
    },
  ], // default value (aka initial value)
});
