// ------------------------------------------
// Configuration for Predict accross the application
// ------------------------------------------
import { atom } from 'recoil'

// This atom stores the current user profile for Predict
export const predictUserProfileAtom = atom({
  key: 'predictUserProfileAtom', // unique ID
  default: { user: 'anonymous' }, // default value
})

// This atom stores the current User ID related to Predict
export const predictUserIdAtom = atom({
  key: 'predictUserIdAtom', // unique ID
  default: '100023285.994839327', // default value
})
