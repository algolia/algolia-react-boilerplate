// Renders the Hierarchical facets
import { useHierarchicalMenu } from 'react-instantsearch-hooks-web';

// This component is recursive, to allow subcategories to be displayed
// eg. Categories > Mens > Clothing > Jackets
const HierarchicalList = (props) => {
  const { items, refine } = props;

  return (
    <>
      {items.map((item) => {
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
            {/* If there are items within the 'data' object, then display them */}
            {item.data && (
              <div className="filters-container-hierarchical__content__list-isOpened">
                <HierarchicalList items={item.data} refine={refine} />
              </div>
            )}
          </li>
        );
      })}
    </>
  );
};

function HierarchicalMenu(props) {
  const { title } = props;
  const { items, onNavigate, createURL, refine } = useHierarchicalMenu(props);
  return (
    <div className="filters-container-hierarchical">
      <div className="filters-container-hierarchical__title">
        <h3>{title}</h3>
      </div>
      <ul className="filters-container-hierarchical__content">
        <HierarchicalList
          items={items}
          onNavigate={onNavigate}
          createURL={createURL}
          refine={refine}
        />
      </ul>
    </div>
  );
}

export default HierarchicalMenu;
