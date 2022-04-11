import { memo } from 'react';

// React Router import
import { useNavigate } from 'react-router-dom';

// Algolia's imports
import { connectRefinementList } from 'react-instantsearch-dom';

// component import
import { ChevronRight } from '@/assets/svg/SvgIndex';

import { federatedCategoriesAttribute } from '@/config/federatedConfig';

const CategoryItems = ({ items }) => {
  // router hook to navigate using a function
  const navigate = useNavigate();

  return (
    <div className="categories">
      <h3 className="categories__title">Categories</h3>
      <div className="categories__wrapper">
        <ul className="categories__items">
          {items.map((hit) => (
            <li
              key={hit.label}
              onClick={() => {
                navigate('/search', {
                  state: `${federatedCategoriesAttribute}:"${hit.label}"`,
                });
              }}
            >
              <ChevronRight />
              <p>{hit.label.split('>').pop()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Category = connectRefinementList(CategoryItems);

export default memo(Category);
