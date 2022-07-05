import { useState } from 'react';

// Import Algolia
import {
  DynamicWidgets,
  useRefinementList,
} from 'react-instantsearch-hooks-web';

// Import magnifying glass svg, and price slider component
import { Glass } from '@/assets/svg/SvgIndex';

// Import components

import HierarchicalMenu from './components/Hierarchical';
import PriceSlider from './components/PriceSlider';

// Import list of Attributes/Facets
import { refinements } from '@/config/refinementsConfig';

//Import scope SCSS
import './SCSS/facets.scss';

// expects an attribute which is an array of items

function GenericRefinementList(props) {
  const { items, refine, searchForItems } = useRefinementList(props);
  const { title, options } = props;
  // With this state you can hide or not facets
  const [showFacet, setShowFacet] = useState(false);
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
  return (
    <div>
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
                />
              );
          }
        })}
      </DynamicWidgets>
    </div>
  );
};

export default Facets;
