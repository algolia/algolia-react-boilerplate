import { useEffect } from 'react'

import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'

import { useSetRecoilState } from 'recoil'

import connectVoiceSearch from 'instantsearch.js/es/connectors/voice-search/connectVoiceSearch'
import { useConnector } from 'react-instantsearch-hooks-web'

// Import searchbox Config
import { searchBoxIsActive } from '@/config/searchboxConfig'

//Import scope SCSS
import './SCSS/voicesearch.scss'

export function useVoiceSearch(props) {
  return useConnector(connectVoiceSearch, props)
}

function CustomVoiceSearchComponent(props) {
  const { refine } = useSearchBox()
  const { isListening, toggleListening, voiceListeningState } =
    useVoiceSearch(props)

  const { status, transcript } = voiceListeningState

  const { pathname } = useLocation()
  const navigate = useNavigate()

  const setSbIsActive = useSetRecoilState(searchBoxIsActive)

  useEffect(() => {
    if (status === 'finished') {
      refine(transcript)

      if (pathname !== '/search') {
        navigate({
          pathname: '/search',
          search: `?${createSearchParams({ query: transcript })}`,
        })
      }
    }
  }, [status])

  return (
    <div className="voiceSearch">
      <button type="button" title="Voice Search" onClick={toggleListening}>
        <svg
          width="17"
          height="26"
          viewBox="0 0 17 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={
            isListening ? 'voiceSearch__active' : 'voiceSearch__inactive'
          }
          onClick={() => setSbIsActive(true)}
        >
          <path
            d="M8.42811 0.160156C5.63229 0.160156 3.36059 2.43185 3.36059 5.22767V12.66C3.36059 15.4559 5.63229 17.7276 8.42811 17.7276C11.2239 17.7276 13.4956 15.4559 13.4956 12.66V5.22767C13.4956 2.43185 11.2239 0.160156 8.42811 0.160156V0.160156ZM1.00661 9.28169C0.645822 9.27604 0.314714 9.60713 0.320384 9.96792V12.6707C0.320384 16.9247 3.58725 20.4059 7.75275 20.7473V23.8089H5.05001C4.67673 23.8089 4.3744 24.1115 4.3744 24.4845C4.3744 24.8578 4.67698 25.1602 5.05001 25.1602H11.8067C12.18 25.1602 12.4823 24.8576 12.4823 24.4845C12.4823 24.1113 12.1797 23.8089 11.8067 23.8089H9.10396V20.7473C13.2694 20.4061 16.5363 16.925 16.5363 12.6707V9.96792C16.5413 9.6109 16.2177 9.28266 15.8607 9.28266C15.5037 9.28266 15.1799 9.61092 15.1851 9.96792V12.6707C15.1851 16.4256 12.1833 19.4273 8.42842 19.4273C4.6735 19.4273 1.67172 16.4256 1.67172 12.6707V9.96792C1.67738 9.6142 1.36042 9.28712 1.00673 9.28169H1.00661Z"
            fill="black"
          />
        </svg>
      </button>
    </div>
  )
}

export default CustomVoiceSearchComponent
