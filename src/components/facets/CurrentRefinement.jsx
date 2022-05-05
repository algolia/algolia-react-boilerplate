// TODO: not sure exactly how this works
// Component that renders the Current Refinements (icons above the products)

// Recoil State
import { connectCurrentRefinements } from 'react-instantsearch-dom';
import { useRecoilValue } from 'recoil';

// import config file for state of facets
import { currencySymbolAtom } from '@/config/currencyConfig';
import { refinementPriceLabels } from '@/config/refinementsConfig';
import { hitsConfig } from '@/config/hitsConfig';

const displayPrice = (i, currencySymbol, refinementPriceLabels) => {
  const { moreThan, lessThan } = refinementPriceLabels;

  // Split the label into an array to work on split
  const arraySplitLabel = i.label.replace(`<= ${i.attribute}`, '').split(' ');
  if (
    i.label.includes(i.currentRefinement.max) &&
    !i.label.includes(i.currentRefinement.min)
  ) {
    return `${lessThan} ${arraySplitLabel[2]} ${currencySymbol}`;
  }
  if (
    i.label.includes(i.currentRefinement.min) &&
    !i.label.includes(i.currentRefinement.max)
  ) {
    return `${moreThan} ${arraySplitLabel[0]} ${currencySymbol}`;
  }
  return (
    `${arraySplitLabel[0]} ${currencySymbol} ` +
    `-` +
    ` ${arraySplitLabel[3]} ${currencySymbol}`
  );
};

const displayColor = (i) => {
  const newColorRefinement = i.split(';')[0];
  return newColorRefinement;
};

const CurrentRefinements = ({ items, refine, createURL }) => {
  const { colourHexa } = hitsConfig;
  const currencySymbol = useRecoilValue(currencySymbolAtom);
  return (
    <ul className="refinement-container__refinements">
      {items.map((item) => {
        if (item.attribute.includes('price')) {
          return (
            <li key={item.label}>
              {item.items ? (
                <>
                  <CurrentRefinementGeneral item={item} />
                </>
              ) : (
                <a
                  href={createURL(item.value)}
                  onClick={(event) => {
                    event.preventDefault();
                    refine(item.value);
                  }}
                >
                  {displayPrice(item, currencySymbol, refinementPriceLabels)}
                </a>
              )}
            </li>
          );
        }
        if (item.attribute.includes(colourHexa)) {
          return (
            <li key={item.label}>
              {item.items ? (
                <>
                  <CurrentRefinementGeneral item={item} colourHexa={true} />
                </>
              ) : (
                <a
                  href={createURL(item.value)}
                  onClick={(event) => {
                    event.preventDefault();
                    refine(item.value);
                  }}
                >
                  {displayColor(item)}
                </a>
              )}
            </li>
          );
        }

        return (
          <li key={item.label}>
            {item.items ? (
              <>
                <CurrentRefinementGeneral item={item} />
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

const CurrentRefinementGeneral = ({ item, colourHexa }) => {
  return (
    <ul className="refinement-container__refinementsInner">
      {item.items.map((nested) => (
        <li key={nested.label}>
          <a
            onClick={(event) => {
              event.preventDefault();
              refine(nested.value);
            }}
          >
            {colourHexa ? displayColor(nested.label) : nested.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

const CustomCurrentRefinements = connectCurrentRefinements(CurrentRefinements);

export default CustomCurrentRefinements;
