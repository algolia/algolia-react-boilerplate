import { QueryRuleCustomData } from 'react-instantsearch-dom';

const Redirect = () => {
  return (
    <QueryRuleCustomData
      transformItems={(items) => {
        const match = items.find((data) => Boolean(data.redirect));
        if (match && match.redirect) {
          window.location.href = match.redirect;
        }
        return [];
      }}
    >
      {() => null}
    </QueryRuleCustomData>
  );
};

export default Redirect;
