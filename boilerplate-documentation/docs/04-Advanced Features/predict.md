# Predict

The app has access to predict through the PredictUserProfileProvider component, found in `./src/components/predict`.

In order for predict to function, it must have a predict App ID, API key and region set in algoliaEnvConfig, found in `./src/config`. Please contact Algolia if you are not sure what values they should have.

You must also adjust the values found in `src/config/predictConfig`. We store a default value for `predictUserIdAtom` to ensure the app works with the default demo flow, but you should replace it with your own predict user ID for your own demo purposes.

You can feel free to keep the default values for all of these atoms and configurations, and follow the default demo flow outlined below (TBD).
