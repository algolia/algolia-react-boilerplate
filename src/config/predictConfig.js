// ------------------------------------------
// Configuration for Predict accross the application
// ------------------------------------------
import { atom } from 'recoil'

// This atom stores the current user profile for Predict
export const predictUserProfileAtom = atom({
<<<<<<< Updated upstream
    key: 'predictUserProfileAtom', // unique ID
    default: null, // default value
=======
  key: 'predictUserProfileAtom', // unique ID
  default: { user: 'anonymous' }, // default value
>>>>>>> Stashed changes
})

// This atom stores the current User ID related to Predict
export const predictUserIdAtom = atom({
  key: 'predictUserIdAtom', // unique ID
  default: '100023285.994839327', // default value
})
