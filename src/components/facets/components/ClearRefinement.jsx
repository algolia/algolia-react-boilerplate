// Component for clearing the selected refinements on Search Results
import { connectCurrentRefinements } from 'react-instantsearch-dom';

const ClearRefinements = ({ items, refine }) =>
  // if there are refinements, show the button
  items.length ? (
    <button
      className="button-clear-refinement"
      onClick={() => refine(items)}
      disabled={!items.length}
    >
      Clear all refinements
    </button>
  ) : null;

const CustomClearRefinements = connectCurrentRefinements(ClearRefinements);

export default CustomClearRefinements;
