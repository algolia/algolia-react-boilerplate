import { useQueryRules } from 'react-instantsearch-hooks-web';

const Redirect = useQueryRules({
  transformItems(items) {
    console.log('transformItems');
    const match = items.find((data) => Boolean(data.redirect));
    console.log(match);
    if (match && match.redirect) {
      window.location.href = match.redirect;
    }
    return [];
  },
});

export default Redirect;
