import { useState } from 'react';

// Import Algolia
import {
  DynamicWidgets,
  useRefinementList,
  useInstantSearch,
} from 'react-instantsearch-hooks-web';

// Import magnifying glass svg, and price slider component
import { ChevronDown, ChevronUp, Glass } from '@/assets/svg/SvgIndex';

// Import components

import HierarchicalMenu from './components/Hierarchical';
import PriceSlider from './components/PriceSlider';

// Import list of Attributes/Facets
import { refinements } from '@/config/refinementsConfig';

//Import scope SCSS
import './SCSS/facets.scss';

// expects an attribute which is an array of items

function GenericRefinementList(props) {
  const {
    items,
    refine,
    searchForItems,
    canToggleShowMore,
    isShowingMore,
    toggleShowMore,
  } = useRefinementList(props);

  const { title, options } = props;
  const { showMoreFunction } = options;

  // With this state you can search for items in facets
  const [searchInput, setSearchInput] = useState(false);

  return (
    <div className="filters-container">
      <div className="filters-container__title">
        <h3>{title}</h3>
        {/* If the facet is searchable, show the magnifying glass which will open or close the search input */}
        {options.searchable && (
          <div
            onClick={() => {
              setSearchInput(!searchInput);
            }}
          >
            <Glass />
          </div>
        )}
      </div>
      <div className="filters-container__list">
        {searchInput && (
          <input
            type="search"
            placeholder="Search"
            onChange={(event) => {
              searchForItems(event.currentTarget.value);
            }}
          />
        )}
      </div>
      <ul className="filters-container__content">
        {items.map((item) => (
          <li className="filters-container__content__list" key={item.value}>
            <button
              className={`filters-container__content__list__button-filter ${
                item.isRefined ? 'refined-filter' : ''
              }`}
              type="button"
              href="#"
              onClick={(event) => {
                event.preventDefault();
                refine(item.value);
              }}
            >
              <p>{item.label}</p>
              <span className="filters-container__content__list__refinement-count">
                {item.count}
              </span>
            </button>
          </li>
        ))}
      </ul>
      {showMoreFunction && (
        <div className="filters-container__button-container">
          <button
            className="filters-container__button-container__button"
            onClick={() => {
              toggleShowMore();
            }}
          >
            {isShowingMore ? (
              <div className="filters-container__button-container__button__content">
                Show Less <ChevronUp />
              </div>
            ) : (
              <div className="filters-container__button-container__button__content">
                Show More <ChevronDown />
              </div>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

// ColorRefinementList custom for Hooks
function CustomColorRefinement(props) {
  const { items, refine, searchForItems } = useRefinementList(props);
  const { title, options } = props;

  return (
    <div className="filters-container">
      <div className="filters-container__title">
        <h3>{title}</h3>
      </div>
      <ul className="filters-container__content-color">
        {items.map((item) => {
          const color = item.value.split(';')[1];
          return (
            <li
              className="filters-container__content-color__list"
              key={item.value}
            >
              <div className="color-name">
                <input
                  className={`filters-container__content__list__button-filter ${
                    item.isRefined ? 'refined-filter' : ''
                  }`}
                  style={{
                    backgroundColor: color,
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                  }}
                  type="button"
                  href="#"
                  value={`${item.isRefined ? '✓' : ''}`}
                  onClick={(event) => {
                    event.preventDefault();
                    refine(item.value);
                  }}
                >
                  {/* <span className="filters-container__content__list__refinement-count">
                  {item.count}
                </span> */}
                </input>
                <p>{item.label.split(';')[0]}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const Facets = () => {
  const { results } = useInstantSearch();
  const facets = results.renderingContent.facetOrdering.facets.order;

  return (
    <div>
      {facets?.length === 0 && (
        <h3 className="no-facets">
          No normal facets returned, check facet ordering section of your
          dashboard.{' '}
          <a href="https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/facet-display/react-hooks/#configuring-your-facet-display-using-the-dashboard">
            Docs
          </a>
        </h3>
      )}

      {facets?.length > 0 && (
        <DynamicWidgets maxValuesPerFacet={500}>
          {refinements.map((e, i) => {
            const { type, label, options } = e;
            switch (type) {
              case 'price':
                return (
                  <PriceSlider
                    attribute={options.attribute}
                    title={label}
                    key={i}
                  />
                );
              case 'colour':
                return (
                  <CustomColorRefinement
                    attribute={options.attribute}
                    key={i}
                    title={label}
                  />
                );
              case 'hierarchical':
                return (
                  <HierarchicalMenu
                    attributes={options.attribute}
                    title={label}
                    key={i}
                  />
                );
              default:
                return (
                  <GenericRefinementList
                    searchable={options?.searchable}
                    key={i}
                    limit={options?.limit}
                    attribute={options.attribute}
                    title={label}
                    options={options}
                    showMore={options?.showMoreFunction}
                  />
                );
            }
          })}
        </DynamicWidgets>
      )}
    </div>
  );
};

export default Facets;
