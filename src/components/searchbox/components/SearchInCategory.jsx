// Component for the searchbox being used when a category is selected eg. 'Mens'
import { useNavigate } from 'react-router-dom';
import { queryAtom } from '@/config/searchboxConfig';
// import {
//   categorySelectionAtom,
//   searchCategoryStateAtom,
// } from '@/config/headerConfig';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { CloseButton, Glass } from '@/assets/svg/SvgIndex';
const SearchInCategory = ({ state }) => {
  // const stateActionName = state.action
  //   .split(':')[1]
  //   .split('>')
  //   .pop()
  //   .replace("'", '')
  //   .slice(0, -1);
  // navigate is used by React Router
  const navigate = useNavigate();
  const query = useRecoilValue(queryAtom);
  // Recoil for
  // LEFT IN FOR REFACTO PURPOSES
  // const setUnderlineCategory = useSetRecoilState(categorySelectionAtom);
  // const setSearchCategoryStateAtom = useSetRecoilState(searchCategoryStateAtom);

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
            // LEFT IN FOR REFACTO PURPOSES
            // setUnderlineCategory(stateActionName);
            // setSearchCategoryStateAtom(stateActionName);
            // set the state
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
            // LEFT IN FOR REFACTO PURPOSES
            // setUnderlineCategory(0);
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
