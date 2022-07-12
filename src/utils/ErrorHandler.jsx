import React, { useEffect, useState } from 'react';
import CustomModal from '@/components/modals/CustomModal';
import { useInstantSearch } from 'react-instantsearch-hooks-web';

function SearchErrorToast() {
  const { use } = useInstantSearch();
  const [error, setError] = useState(null);
  const [modalActive, setModalActive] = useState(false)

  useEffect(() => {
    const middleware = ({ instantSearchInstance }) => {
      function handleError(searchError) {
        setError(searchError);
      }

      return {
        subscribe() {
          instantSearchInstance.addListener('error', handleError);
        },
        unsubscribe() {
          instantSearchInstance.removeListener('error', handleError);
        },
      };
    };

    return use(middleware);
  }, [use]);

  useEffect(() => {
    setModalActive(Boolean(error))
  }, [error]);

  if (!error) {
    return null;
  }

  return (
    <CustomModal isActive={modalActive} setActive={setModalActive}>
      <div className="error-modal-container">
        <div className="BasketContent">
            <h5>{error.name}</h5>
            <p>{error.message}</p>
        </div>

      </div>
    </CustomModal>
  );
}

export default SearchErrorToast;
