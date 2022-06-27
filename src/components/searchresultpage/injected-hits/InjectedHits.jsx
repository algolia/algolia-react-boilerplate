import CustomHits from '@/components/hits/CustomHits';
import { useHits } from 'react-instantsearch-hooks-web';

const InjectedHits = (props) => {
  // Get the regular hits
  const { hits } = useHits(props);

  return <CustomHits hits={hits} />;
};

export default InjectedHits;
