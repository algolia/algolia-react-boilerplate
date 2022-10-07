//Algolia's import
import { useQueryRules } from 'react-instantsearch-hooks-web';

// Import Recoil
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

// Import React router
import { useSearchParams } from 'react-router-dom';

// Import Config
import { showRedirectModal } from '@/config/redirectConfig';
import { queryAtom } from '@/config/searchboxConfig';

import { windowSize } from '@/hooks/useScreenSize';

//importing CSS
import './SCSS/redirect.scss';

function Redirect(props) {
  const { items } = useQueryRules(props);
  const [isRedirectModal, setIsRedirectModal] =
    useRecoilState(showRedirectModal);

  const setQuery = useSetRecoilState(queryAtom);

  const { isDesktop } = useRecoilValue(windowSize);

  // Handle URL search parameters through React Router
  let [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);

  const match = items.find((data) => Boolean(data.redirect));
  match && match.redirect
    ? setIsRedirectModal(true)
    : setIsRedirectModal(false);

  if (match && match.redirect && isRedirectModal) {
    return (
      <div className="redirectModal-wp">
        <div
          className={
            isDesktop ? 'redirectModal' : 'redirectModal redirectModal-mobile'
          }
        >
          <div className="redirectModal__infos">
            <p>This query will take you to Alolia's Homepage</p>
            <p>Do you wish to be redirected ? </p>
          </div>
          <div className="redirectModal__buttons">
            <a
              href="#"
              className="redirectModal__buttons-ok"
              onClick={() => {
                window.location.href = match.redirect;
                setIsRedirectModal(false);
              }}
            >
              <p>Yes I want to be redirected</p>
            </a>
            <a
              href="#"
              className="redirectModal__buttons-no"
              onClick={() => {
                setQuery('');
                searchParams.set('query', '');
                setSearchParams(searchParams);
                setIsRedirectModal(false);
              }}
            >
              <p>No I want to stay on this demo</p>
            </a>
          </div>
        </div>
      </div>
    );
  } else return null;
}

export default Redirect;
