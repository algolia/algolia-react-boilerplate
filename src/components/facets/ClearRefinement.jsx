// Component for clearing the selected refinements on Search Results
import { useCurrentRefinements } from 'react-instantsearch-hooks-web';

function CustomClearRefinements(props) {
  const { items, refine } = useCurrentRefinements(props);
  // if there are refinements, show the button
  return items.length ? (
    <button
      className="button-clear-refinement"
      onClick={() => refine(items)}
      disabled={!items.length}
    >
      Clear all refinements
    </button>
  ) : null;
}

export default CustomClearRefinements;
