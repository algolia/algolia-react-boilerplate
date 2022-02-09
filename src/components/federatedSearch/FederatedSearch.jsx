import React, { useRef } from "react";

// Algolias's import
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, Configure } from "react-instantsearch-dom";

// import from Recoil
import { useRecoilState } from "recoil";
import { configAtom } from "../../config/config";

// Components imports
import RecentSearches from "./components/RecentSearches";
import QuerySuggestions from "./components/QuerySuggestions";
import Category from "./components/Category";
import Products from "./components/Products";
import Articles from "./components/BlogPost";

const FederatedSearch = () => {
  console.log("Federated called");
  // Recoil & States
  const [config] = useRecoilState(configAtom);
  const containerFederated = useRef("");
  // Configuration for federated search
  const {
    isRecentSearch,
    isQuerySuggestions,
    isCategory,
    isBlogPosts,
    isProduct,
  } = config.federatedSearchConfig;
  // Algolia searchclient
  const search = algoliasearch(
    config.searchClient.appID,
    config.searchClient.APIKey
  );
  return (
    <div className="federatedSearch" ref={containerFederated}>
      <div className="federatedSearch__wrapper">
        <div className="federatedSearch__left">
          {isRecentSearch && <RecentSearches />}
          {isQuerySuggestions && (
            <InstantSearch
              searchClient={search}
              indexName={config.indexName.indexSuggestion}
            >
              <Configure hitsPerPage={3} />
              <QuerySuggestions />
            </InstantSearch>
          )}
          {isCategory && (
            <Category
              attribute={config.federatedCategory.categoryInFederated}
            />
          )}
        </div>
        {isProduct && (
          <div className="federatedSearch__middle">
            <Configure
              filters=""
              hitsPerPage={6}
              // enablePersonalization={true}
              // userToken={getPersona}
            />
            <Products />
          </div>
        )}
        {isBlogPosts && (
          <div className="articles federatedSearch__right">
            <InstantSearch
              searchClient={search}
              indexName={config.indexName.indexBlog}
            >
              <Configure hitsPerPage={1} />
              <Articles />
            </InstantSearch>
          </div>
        )}
      </div>
    </div>
  );
};

export default FederatedSearch;
