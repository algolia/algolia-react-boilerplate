// Renders the Hierarchical facets
import { connectHierarchicalMenu } from 'react-instantsearch-dom';

// This component is recursive, to allow subcategories to be displayed
// eg. Categories > Mens > Clothing > Jackets
const Hierarchical = ({ items, refine, createURL, title }) => {
  return (
    <div className="filters-container-hierarchical">
      <div className="filters-container-hierarchical__title">
        <h3>{title}</h3>
      </div>
      <ul className="filters-container-hierarchical__content">
        {items.map((item) => (
          <li
            className="filters-container-hierarchical__content__list"
            key={item.value}
          >
            <button
              className={`filters-container-hierarchical__content__list__button-filter ${
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
              <span className="filters-container-hierarchical__content__list__refinement-count">
                {item.count}
              </span>
            </button>
            {/* If there are items within the 'item' object, then display them */}
            {item.items && (
              <div className="filters-container-hierarchical__content__list-isOpened">
                <Hierarchical
                  items={item.items}
                  refine={refine}
                  createURL={createURL}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const CustomHierarchicalMenu = connectHierarchicalMenu(Hierarchical);

export default CustomHierarchicalMenu;
