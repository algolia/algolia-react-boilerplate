// Component for clearing the selected refinements on Search Results
import { useClearRefinements } from 'react-instantsearch-hooks-web';

function CustomClearRefinements(props) {
  const { canRefine, refine } = useClearRefinements(props);

  // if there are refinements, show the button
  // Clear refinements with the refinement to ' '
  return canRefine ? (
    <button
      className="button-clear-refinement"
      onClick={() => refine('')}
      // disabled={!items}
    >
      Clear all refinements
    </button>
  ) : null;
}

export default CustomClearRefinements;
