// Component for clearing the selected refinements on Search Results

import { navigationStateAtom } from '@/config/navigationConfig'
import { useEffect } from 'react'
import { useClearRefinements } from 'react-instantsearch-hooks-web'
import { useSearchParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'

function CustomClearRefinements(props) {
  const { canRefine, refine } = useClearRefinements(props)
  // Handle URL search parameters through React Router
  let [searchParams, setSearchParams] = useSearchParams()
  const [navigationState, setNavigationState] =
    useRecoilState(navigationStateAtom)

  const handleContextInUrl = () => {
    if (navigationState.type === 'context') {
      searchParams.delete(navigationState.type)
      searchParams.append(navigationState.type, navigationState.value)
      setSearchParams(searchParams)
    }
  }

  // if there are refinements, show the button
  // Clear refinements with the refinement to ' '
  return canRefine ? (
    <button
      className="button-clear-refinement"
      onClick={() => {
        refine('')
        setNavigationState({})
        setTimeout(() => handleContextInUrl(), 500)
      }}
    >
      <p>Clear all refinements</p>
    </button>
  ) : null
}

export default CustomClearRefinements
