// Component for clearing the selected refinements on Search Results
import { useClearRefinements } from 'react-instantsearch-hooks-web';

function CustomClearRefinements(props) {
  const { canRefine, refine } = useClearRefinements(props);
  console.log(canRefine);
  // if there are refinements, show the button
  return canRefine ? (
    <button
      className="button-clear-refinement"
      onClick={() => refine(items)}
      disabled={!items}
    >
      Clear all refinements
    </button>
  ) : null;
}

export default CustomClearRefinements;
