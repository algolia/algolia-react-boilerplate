import { useQueryRules } from 'react-instantsearch-hooks-web';

function Redirect(props) {
  const { items } = useQueryRules(props);
  console.log(items);
  const match = items.find((data) => Boolean(data.redirect));
  if (match && match.redirect) {
    window.location.href = match.redirect;
  }
  return null;
}

export default Redirect;
