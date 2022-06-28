import CustomHits from '@/components/hits/CustomHits';
import { lazy, useState } from 'react';
import { useEffect } from 'react';
import { useHits, useQueryRules } from 'react-instantsearch-hooks-web';
import injectContent from './injectContent';

const NoCtaCard = lazy(() => import('@/components/hits/NoCtaCard'));
const SalesCard = lazy(() => import('@/components/hits/SalesCard'));

// Maps from each injected content type to it's render component
const contentTypeComponentMap = {
  noCta: NoCtaCard,
  salesCard: SalesCard,
};

// This component renders the custom query hits, but also injects them with content from rule data or the injection Index
const InjectedHits = (props) => {
  // Get the regular hits
  const { hits } = useHits(props);
  console.log(
    '🚀 ~ file: InjectedHits.jsx ~ line 20 ~ InjectedHits ~ hits',
    hits
  );

  // Get custom data from rules
  const { items: ruleData } = useQueryRules(props);

  // Will hold the hits with injected content
  const [injectedHits, setInjectedHits] = useState(hits);

  // console.log(items, 'rules items');

  useEffect(() => {
    // Will hold all the items to be injected
    let itemsToInject;

    // Add the items from rule data
    itemsToInject = ruleData
      // Only keep items with type either "noCta" or "salesCard"
      .filter(({ type }) => type == 'noCta' || type == 'salesCard')
      // Add to each injected item the corresponding component that will render it
      .map((item) => ({
        ...item,
        _component: contentTypeComponentMap[item.type],
      }));

    // Inject items
    setInjectedHits(injectContent(hits, itemsToInject));
  }, [ruleData, hits]);

  return <CustomHits hits={injectedHits} />;
};

export default InjectedHits;
