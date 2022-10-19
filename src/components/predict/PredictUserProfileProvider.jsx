import { useEffect } from 'react'
import { Predict } from '@algolia/predict-react'
import { predictUserProfileAtom } from '@/config/predictConfig'
import { predictClient } from '@/config/algoliaEnvConfig'
import { useRecoilState } from 'recoil'

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
      });
  }, [userID])

  if (!userProfile) {
    return children;
  }

  return (
    <Predict userProfile={userProfile} suppressExperimentalWarning>
      {children}
    </Predict>
  )
}

export default PredictUserProfileProvider