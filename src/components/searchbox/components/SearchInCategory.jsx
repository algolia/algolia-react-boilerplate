// Component for the searchbox being used when a category is selected eg. 'Mens'xz
import { useNavigate } from 'react-router-dom';
import { CloseButton } from '@/assets/svg/SvgIndex';

//Use Translation
import { useTranslation } from 'react-i18next';

const SearchInCategory = ({ state }) => {
  // navigate is used by React Router
  const navigate = useNavigate();

  // Import const translation
  // Use the translator
  const { t } = useTranslation('translation', {
    keyPrefix: 'srp',
  });

  if (state?.type === 'filter' && state?.action !== null) {
    return (
      <div className="searchbox__category">
        <p>
          {t('searchInCategory')}{' '}
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
        <p>
          {t('searchInCategory')} {state.action}
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
  } else {
    return null;
  }
};

export default SearchInCategory;
