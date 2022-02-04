import React, { useEffect } from "react";

// Reqct Router
import { Link } from "react-router-dom";

// Import Hook
import useStickyHeader from "../../hooks/useStickyHeader";

// Recoil Header State
import { linksHeader } from "../../config/header";
import { useRecoilState } from "recoil";

// Import SearchBox
import SearchBoxSimple from "../searchbox/SearchBoxSimple";

const Header = () => {
  const sticky = useStickyHeader();
  const headerClasses = `header ${sticky ? "sticky" : ""}`;
  const [links, setLinks] = useRecoilState(linksHeader);

  return (
    <div>
      <header id="myHeader" className={headerClasses}>
        <div className="container">
          <div className="container__header-top">
            <div className="container__logo">
              <Link to="/">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Algolia-logo.svg/1200px-Algolia-logo.svg.png"
                  alt=""
                />
              </Link>
            </div>
            {/* For a search box Simple center */}
            <SearchBoxSimple />
            <div className="container__title">
              <h1>Demo BoilerPlate</h1>
            </div>
          </div>
          <nav className="container__header-bottom">
            <ul className="container__header-bottom__links">
              {links.map((link, i) => {
                return (
                  <li key={i}>
                    <Link to={link.url}>{link.link}</Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
