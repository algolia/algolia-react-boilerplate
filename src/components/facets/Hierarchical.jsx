// Renders the Hierarchical facets
import { useHierarchicalMenu } from 'react-instantsearch-hooks-web';

// This component is recursive, to allow subcategories to be displayed
// eg. Categories > Mens > Clothing > Jackets
function CustomHierarchicalMenu(props) {
  const { items, refine, title } = useHierarchicalMenu(props);

  return (
    <div className="filters-container-hierarchical">
      <div className="filters-container-hierarchical__title">
        <h3>Test</h3>
      </div>
      <ul className="filters-container-hierarchical__content">
        {items.map((item) => {
          console.log(item);
          return (
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
                  <CustomHierarchicalMenu items={item.items} refine={refine} />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CustomHierarchicalMenu;
