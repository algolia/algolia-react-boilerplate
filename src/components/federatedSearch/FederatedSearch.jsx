import React, { useRef } from "react";

// import from Recoil
import { useRecoilState } from "recoil";
import { configAtom } from "../../config/config";

const FederatedSearch = () => {
  const [config] = useRecoilState(configAtom);
  const containerFederated = useRef();
  console.log(config);
  return (
    <div className="federatedSearch" ref={containerFederated}>
      <div className="federatedSearch__wrapper">
        <div className="federatedSearch__left">
          <div className="recentSearches">{/* <RecentSearches /> */}</div>
          <div className="suggestions">
            {/* <InstantSearch
            searchClient={searchClient}
            indexName={window.indexSugg}
          >
            <h3 className="federatedSearch__title">SUGGESTIONS</h3>
            <VirtualSearchBox />
            <Configure hitsPerPage={3} />
            <CustomSuggestions />
          </InstantSearch> */}
          </div>
          <div className="categories">
            <h3 className="federatedSearch__title">Categories</h3>
            <div className="categories__wrapper">
              <div className="categories__item">
                {/* <Configure filters="" /> */}
                <h4>Herren</h4>
                {/* <CustomCategoriesMan
                attribute="default-category-path.lvl3"
                limit={3}
              /> */}
              </div>
              <div className="categories__item">
                {/* <Configure filters="default-category-path.lvl1: 'Alle Marken > Damen'" /> */}
                <h4>Damen</h4>
                {/* <CustomCategoriesWoman
                attribute="default-category-path.lvl3"
                limit={3}
              /> */}
              </div>
            </div>
          </div>
        </div>

        <div className="products federatedSearch__middle">
          <div className="products__header">
            <h3 className="federated-title">Products</h3>
          </div>

          {/* <Configure
            filters=""
            hitsPerPage={6}
            enablePersonalization={true}
            userToken={getPersona}
          />
          <CustomHitsFederated /> */}

          <div
            className="products__btn"
            onClick={() => {
              navigate("/search");
            }}
          >
            <p>SHOW ALL PRODUCTS</p>
          </div>
        </div>

        <div className="articles federatedSearch__right">
          {/* <InstantSearch
          searchClient={searchClient}
          indexName={window.indexArticles}
        > */}
          <h3 className="federatedSearch__title">ARTICLES</h3>
          {/* <VirtualSearchBox />
          <Configure hitsPerPage={1} />
          <CustomArticles />
        </InstantSearch> */}
        </div>
      </div>
    </div>
  );
};

export default FederatedSearch;
