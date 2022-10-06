import { divide } from 'lodash';
import { useQueryRules } from 'react-instantsearch-hooks-web';
import { useNavigate } from 'react-router-dom';

function Redirect(props) {
  const { items } = useQueryRules(props);

  const match = items.find((data) => Boolean(data.redirect));
  if (match && match.redirect) {
    return (
      <div className="redirectModal">
        <div className="redirectModal__infos">
          <p>This query will take you to Alolia's Homepage</p>
          <p>Do you wish to be redirected ? </p>
        </div>
        <div className="redirectModal__buttons">
          <a
            href="#"
            className="redirectModal__buttons-ok"
            onClick={() => (window.location.href = match.redirect)}
          >
            <p>Yes I want to be redirected</p>
          </a>
          <a href="#" className="redirectModal__buttons-no">
            <p>No I want to stay on this demo</p>
          </a>
        </div>
      </div>
    );
  } else return null;
}

export default Redirect;
