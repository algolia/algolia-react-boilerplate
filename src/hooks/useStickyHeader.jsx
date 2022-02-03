import React from "react";
import { useEffect, useState } from "react";

function useStickyHeader() {
  const [sticky, setsticky] = useState(false);
  useEffect(() => {
    const header = document.getElementById("myHeader");
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
        if (sticky !== true) {
          setsticky(true);
        }
      } else {
        header.classList.remove("sticky");
        if (sticky !== false) {
          setsticky(false);
        }
      }
    });
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);
  return sticky;
}

export default useStickyHeader;
