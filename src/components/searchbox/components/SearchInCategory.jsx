// Component for the searchbox being used when a category is selected eg. 'Mens'xz
import { useNavigate } from 'react-router-dom';
import { CloseButton } from '@/assets/svg/SvgIndex';

const SearchInCategory = ({ state }) => {
  // navigate is used by React Router
  const navigate = useNavigate();

  if (state?.type === 'filter' && state?.action !== null) {
    return (
      <div className="searchbox__category">
        <p>
          Search in{' '}
          {state.action
            .split(':')[1]
            .split('>')
            .pop()
            .replace("'", '')
            .slice(0, -1)}
        </p>
        <span
          onClick={() => {
            navigate('/search');
          }}
          className="searchbox__category__close-btn"
        >
          <CloseButton />
        </span>
      </div>
    );
  } else if (state?.type === 'context') {
    return (
      <div className="searchbox__category">
        <p> Search in {state.action}</p>
        <span
          onClick={() => {
            navigate('/search');
          }}
          className="searchbox__category__close-btn"
        >
          <CloseButton />
        </span>
      </div>
    );
  } else {
    return null;
  }
};

export default SearchInCategory;
