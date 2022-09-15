import { memo } from 'react';

// React Router import
import { useNavigate } from 'react-router-dom';

// Algolia's imports
import { useRefinementList } from 'react-instantsearch-hooks-web';

// component import
import { ChevronRight } from '@/assets/svg/SvgIndex';

import { federatedCategoriesAttribute } from '@/config/federatedConfig';

const categoryArray = [
  'Home Furnishings',
  'Bathroom',
  'Kitchen & Dining',
  'Home Security',
];

function Category(props) {
  const { items } = useRefinementList(props);
  //Get title
  const { title } = props;
  // router hook to navigate using a function
  const navigate = useNavigate();
  return (
    <div className="categories">
      <h3 className="categories__title">Trending Searches</h3>
      <div className="categories__wrapper">
        <ul className="categories__items">
          {categoryArray.map((hit) => {
            return (
              <li
                key={hit}
                onClick={() => {
                  navigate('/search', {
                    state: {
                      type: 'filter',
                      action: `${federatedCategoriesAttribute}:"Home > Home > ${hit}"`,
                    },
                  });
                }}
              >
                <ChevronRight />
                <p>{hit}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default memo(Category);
