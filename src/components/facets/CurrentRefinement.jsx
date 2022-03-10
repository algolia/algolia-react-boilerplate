// TODO: not sure exactly how this works
// Component that renders the Current Refinements (icons above the products)

// Recoil State
import { configAtom } from '../../config/config';
import { useRecoilState } from 'recoil';

// Algolia functionality
import { connectCurrentRefinements } from 'react-instantsearch-dom';

const CurrentRefinements = ({ items, refine, createURL }) => (
  <ul className="refinement-container__refinements">
    {items.map((item) => {
      if (item.attribute.includes('price')) {
        return (
          <li key={item.label}>
            {/* If there are nested items, render them into the component */}
            {item.items ? (
              <>
                <ul>
                  {item.items.map((nested) => (
                    <li key={nested.label}>
                      <a
                        href={createURL(nested.value)}
                        onClick={(event) => {
                          event.preventDefault();
                          refine(nested.value);
                        }}
                      >
                        {nested.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              // Otherwise, just render the items
              <a
                href={createURL(item.value)}
                onClick={(event) => {
                  event.preventDefault();
                  refine(item.value);
                }}
              >
                {/* {item.label.replace(item.attribute, 'Between')} */}
                {displayPrice(item)}
              </a>
            )}
          </li>
        );
      } else {
        return (
          <li key={item.label}>
            {item.items ? (
              <>
                <ul>
                  {item.items.map((nested) => (
                    <li key={nested.label}>
                      <a
                        href={createURL(nested.value)}
                        onClick={(event) => {
                          event.preventDefault();
                          refine(nested.value);
                        }}
                      >
                        {nested.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <a
                href={createURL(item.value)}
                onClick={(event) => {
                  event.preventDefault();
                  refine(item.value);
                }}
              >
                {item.label}
              </a>
            )}
          </li>
        );
      }
    })}
  </ul>
);

// Component to render price slider
const displayPrice = (i) => {
  const [config] = useRecoilState(configAtom);
  const currency = config.currency.value;
  if (
    i.label.includes(i.currentRefinement.max) &&
    !i.label.includes(i.currentRefinement.min)
  ) {
    return (
      'Less than' +
      ' ' +
      i.label.replace(`<= ${i.attribute}`, '').split(' ')[2] +
      ' ' +
      currency
    );
  }
  if (
    i.label.includes(i.currentRefinement.min) &&
    !i.label.includes(i.currentRefinement.max)
  ) {
    return (
      'More than' +
      ' ' +
      i.label.replace(`<= ${i.attribute}`, '').split(' ')[0] +
      ' ' +
      currency
    );
  }
  return (
    i.label.replace(`<= ${i.attribute}`, '').split(' ')[0] +
    ' ' +
    currency +
    ' ' +
    '-' +
    ' ' +
    i.label.replace(`<= ${i.attribute}`, '').split(' ')[3] +
    ' ' +
    currency
  );
};

const CustomCurrentRefinements = connectCurrentRefinements(CurrentRefinements);

export default CustomCurrentRefinements;
