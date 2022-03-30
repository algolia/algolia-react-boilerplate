// Component for the searchbox being used when a category is selected eg. 'Mens'
import { useNavigate } from 'react-router-dom';
const SearchInCategory = ({ state }) => {
  // navigate is used by React Router
  const navigate = useNavigate();
  return (
    <div className="searchbox__category">
      <p>
        Search in{' '}
        {state.split(':')[1].split('>').pop().replace("'", '').slice(0, -1)}
      </p>
      <span
        onClick={() => {
          navigate('/search');
        }}
      >
        X
      </span>
    </div>
  );
};

export default SearchInCategory;
