import { useState } from 'react';

// Import Algolia
// eslint-disable-next-line import/order
import { DynamicWidgets, connectRefinementList } from 'react-instantsearch-dom';
import {
  ColorRefinementList,
  Layout,
  Shape,
} from '@algolia/react-instantsearch-widget-color-refinement-list';

// Import magnifying glass svg, and price slider component
import { Glass } from '@/assets/svg/SvgIndex';

// Import components
import PriceSlider from './PriceSlider';
import CustomHierarchicalMenu from './Hierarchical';

// Import list of Attributes/Facets
import { refinements } from '@/config/refinementsConfig';

// expects an attribute which is an array of items
const RefinementList = ({ title, items, refine, searchForItems, options }) => {
  const [showFacet, setShowFacet] = useState(false);
  const [searchInput, setSearchInput] = useState(false);
  return (
    <div className="filters-container">
      <div className="filters-container__title">
        <h3>{title}</h3>
        {/* If the facet is searchable, show the magnifying glass which will open or close the search input */}
        {options.searchable && (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
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
            className={`${
              showFacet
                ? 'filters-container__list__search-facet'
                : 'filters-container__list__search-facet__hidden'
            }`}
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
};

const GenericRefinementList = connectRefinementList(RefinementList);

const CustomColorRefinement = ({
  title,
  attribute,
  separator,
  layout,
  shape,
}) => {
  return (
    <div className="color-refinement">
      <h3>{title}</h3>
      <ColorRefinementList
        limit={16}
        attribute={attribute}
        separator={separator}
        layout={layout}
        shape={shape}
      />
    </div>
  );
};

const Facets = () => {
  return (
    <div>
      <DynamicWidgets>
        {refinements.map((e, i) => {
          const { type, currency, label, options } = e;
          switch (type) {
            case 'price':
              return (
                <PriceSlider
                  attribute={options.attribute}
                  title={label}
                  currency={currency}
                  key={i}
                />
              );
            case 'colour':
              return (
                <CustomColorRefinement
                  key={i}
                  title={label}
                  attribute={options.attribute}
                  separator=";"
                  layout={Layout.Grid}
                  shape={Shape.Circle}
                />
              );
            case 'hierarchical':
              return (
                <CustomHierarchicalMenu
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
