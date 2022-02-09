import React from "react";

const RecentSearches = React.memo(() => {
  console.log("RecentSearches called");
  const getSearches = localStorage.getItem("recentSearches");
  const cleanSearches = JSON.parse(getSearches);

  if (cleanSearches && cleanSearches.length !== 0) {
    return (
      <div className="recentSearches">
        <h3 className="recentSearches__title">Recent Searches</h3>
        <ul className="recentSearches__items">
          {cleanSearches
            .reverse()
            .splice(0, 3)
            .map((search, index) => {
              return (
                <li onClick={(e) => {}} key={index}>
                  <p>{search}</p>
                </li>
              );
            })}
        </ul>
      </div>
    );
  } else {
    return "";
  }
});

export default RecentSearches;
