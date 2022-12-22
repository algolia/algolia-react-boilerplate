import { memo, useEffect, useState } from 'react'

//Algolia's import
import { useQueryRules } from 'react-instantsearch-hooks-web'

// Import Recoil
import { useRecoilState } from 'recoil'

// Import React router
import { useNavigate } from 'react-router-dom'

import CustomModal from '@/components/modals/CustomModal'

import { showRedirectModal } from '@/config/redirectConfig'

//importing CSS
import './SCSS/redirect.scss'

const Redirect = () => {
  const { items } = useQueryRules()
  const [urlToRedirectTo, setUrlToRedirectTo] = useState('')
  const [redirectRulePresent, setRedirectRulePresent] = useState(false)
  const [shouldShowRedirectModal, setShouldShowRedirectModal] =
    useRecoilState(showRedirectModal)

  useEffect(() => {
    let matches = items.filter((item) => item.type === 'redirect')
    if (matches.length > 0) {
      setUrlToRedirectTo(matches[0].redirect)
      setRedirectRulePresent(true)
      setShouldShowRedirectModal(true)
    }
  }, [items])

  const navigate = useNavigate()

  if (redirectRulePresent && shouldShowRedirectModal) {
    return (
      <CustomModal
        isActive={shouldShowRedirectModal}
        setActive={setShouldShowRedirectModal}
      >
        <div className="redirectModal__infos">
          <p>
            This query will take you to <span>Algolia's Homepage</span>
          </p>
          <p>Do you wish to be redirected ? </p>
        </div>
        <div className="redirectModal__buttons">
          <a
            className="redirectModal__buttons-ok"
            onClick={() => {
              window.location.replace(urlToRedirectTo)
              setShouldShowRedirectModal(false)
            }}
          >
            <p>Yes I want to be redirected</p>
          </a>
          <a
            className="redirectModal__buttons-no"
            onClick={() => {
              setShouldShowRedirectModal(false)
              navigate({
                pathname: '/search',
              })
            }}
          >
            <p>No I want to stay on this demo</p>
          </a>
        </div>
      </CustomModal>
    )
  } else return null
}

export default memo(Redirect)
