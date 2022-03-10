// TODO: can this component be refined? I think I could improve it, possibly
// Component for clearing the selected refinements on Search Results
import { connectCurrentRefinements } from 'react-instantsearch-dom';

const ClearRefinements = ({ items, refine }) => {
  const number = items.length;
  // if there are refinements, show the button
  if (number) {
    return (
      <button
        className="button-clear-refinement"
        onClick={() => refine(items)}
        disabled={!items.length}
      >
        Clear all refinements
      </button>
    );
  } else {
    return '';
  }
};

const CustomClearRefinements = connectCurrentRefinements(ClearRefinements);

export default CustomClearRefinements;
