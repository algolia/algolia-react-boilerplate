import React from 'react';
// Recoil State
import { connectCurrentRefinements } from 'react-instantsearch-dom';
import { useRecoilValue } from 'recoil';

// import config file for state of facets
import { currency, configAtom } from '../../config/config';

const displayPrice = (i, currencyValue, refinementPrice) => {
  const moreThanValue = refinementPrice.moreThan;
  const lessThanValue = refinementPrice.lessThan;
  // Split the label into an array to work on split
  const arraySplitLabel = i.label.replace(`<= ${i.attribute}`, '').split(' ');
  if (
    i.label.includes(i.currentRefinement.max) &&
    !i.label.includes(i.currentRefinement.min)
  ) {
    return `${lessThanValue} ${arraySplitLabel[2]} ${currencyValue}`;
  }
  if (
    i.label.includes(i.currentRefinement.min) &&
    !i.label.includes(i.currentRefinement.max)
  ) {
    return `${moreThanValue} ${arraySplitLabel[0]} ${currencyValue}`;
  }
  return (
    `${arraySplitLabel[0]} ${currencyValue} ` +
    `-` +
    ` ${arraySplitLabel[3]} ${currencyValue}`
  );
};

const CurrentRefinements = ({ items, refine, createURL }) => {
  const currencyValue = useRecoilValue(currency);
  const { refinementPrice } = useRecoilValue(configAtom);
  return (
    <ul className="refinement-container__refinements">
      {items.map((item) => {
        if (item.attribute.includes('price')) {
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
                  {displayPrice(item, currencyValue, refinementPrice)}
                </a>
              )}
            </li>
          );
        }
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
      })}
    </ul>
  );
};

const CustomCurrentRefinements = connectCurrentRefinements(CurrentRefinements);

export default CustomCurrentRefinements;
