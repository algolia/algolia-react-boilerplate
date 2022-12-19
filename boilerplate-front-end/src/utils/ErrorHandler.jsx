import React, { useEffect, useState } from 'react'
import CustomModal from '@/components/modals/CustomModal'
import { useInstantSearch } from 'react-instantsearch-hooks-web'

// This component listens for instantSearch API errors and logs them in a modal
function SearchErrorToast() {
  const { use } = useInstantSearch()
  const [error, setError] = useState(null)
  const [modalActive, setModalActive] = useState(false)

  useEffect(() => {
    const middleware = ({ instantSearchInstance }) => {
      function handleError(searchError) {
        setError(searchError)
      }

      return {
        subscribe() {
          instantSearchInstance.addListener('error', handleError)
        },
        unsubscribe() {
          instantSearchInstance.removeListener('error', handleError)
        },
      }
    }

    return use(middleware)
  }, [use])

  useEffect(() => {
    ;(function (open) {
      XMLHttpRequest.prototype.open = function (m, u, a, us, p) {
        this.addEventListener(
          'readystatechange',
          function () {
            if (
              typeof this.response === typeof '' &&
              this.response.length > 0
            ) {
              try {
                let res = JSON.parse(this.response)
                res.url = this.responseURL
                Boolean(res.message) && setError(res)
              } catch (err) {
                // 👇️ SyntaxError: Unexpected end of JSON input
                // console.log('error', err, this.response);
              }
            }
          },
          false
        )

        open.call(this, m, u, a, us, p)
      }
    })(XMLHttpRequest.prototype.open)

    return () => {
      ;(function (open) {
        XMLHttpRequest.prototype.open = function (m, u, a, us, p) {
          this.removeEventListener('readystatechange', function () {}, false)

          open.call(this, m, u, a, us, p)
        }
      })(XMLHttpRequest.prototype.open)
    }
  }, [])

  useEffect(() => {
    // if there is an error, we activate the modal
    setModalActive(Boolean(error))
  }, [error])

  if (!error) {
    return null
  }

  // To close the modal simply click on the grey background

  return (
    // pass state down to custom modal to display and close it
    <CustomModal isActive={modalActive} setActive={setModalActive}>
      <div className="error-modal-container">
        <div className="error-modal-content">
          <h5>
            {error.status} {error.name || 'Error'}
          </h5>
          <strong>
            <p>{error.message}</p>
          </strong>
          {error.url && (
            <p>
              <strong>URL:</strong> {error.url}
            </p>
          )}
        </div>
      </div>
    </CustomModal>
  )
}

export default SearchErrorToast
