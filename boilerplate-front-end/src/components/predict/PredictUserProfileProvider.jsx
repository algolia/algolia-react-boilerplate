import { useEffect } from 'react'
import { Predict } from '@algolia/predict-react'
import { predictUserProfileAtom } from '@/config/predictConfig'
import { predictClient } from '@/config/algoliaEnvConfig'
import { useRecoilState } from 'recoil'

// PredictUserProfileProvider returns the Predict wrapper with the children encapsulated, or just the children
// It depends on whether there is a valid user profile for the current user ID which is passed to the component
function PredictUserProfileProvider({ userID, children }) {
  const [userProfile, setUserProfile] = useRecoilState(predictUserProfileAtom)

  useEffect(() => {
    predictClient
      .fetchUserProfile({
        userID,
        params: {
          modelsToRetrieve: ['funnel_stage', 'order_value', 'affinities'],
          typesToRetrieve: ['properties', 'segments'],
        },
      })
      .then((nextUserProfile) => {
        setUserProfile(nextUserProfile)
      })
  }, [userID])

  if (!userProfile) {
    return children
  }

  return (
    <Predict userProfile={userProfile} suppressExperimentalWarning>
      {children}
    </Predict>
  )
}

export default PredictUserProfileProvider
