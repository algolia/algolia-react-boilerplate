import React from 'react';

import { connectCurrentRefinements } from 'react-instantsearch-dom';

const CurrentRefinements = ({ items, refine, createURL }) => (
  <ul className="refinement-container__refinements">
    {items.map((item) => {
      console.log(item);
      if (item.attribute.includes('price')) {
        console.log('first');
        return (
          <li key={item.label}>
            {item.items ? (
              <React.Fragment>
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
              </React.Fragment>
            ) : (
              <a
                href={createURL(item.value)}
                onClick={(event) => {
                  event.preventDefault();
                  refine(item.value);
                }}
              >
                {if()}
                {item.label.replace(item.attribute, "Between")}
              </a>
            )}
          </li>
        );
      } else {
        return (
          <li key={item.label}>
            {item.items ? (
              <React.Fragment>
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
              </React.Fragment>
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

const CustomCurrentRefinements = connectCurrentRefinements(CurrentRefinements);

export default CustomCurrentRefinements;
