---
sidebar_position: 1
---

# Pre-requisites

Before proceeding, please make sure you have the following:

- Node v16.0.0+ installed
- Yarn installed

## Get started

1. Clone the parent repo under a new name for your own demo. You can use the `main` branch that has some features turned off for easier integration

2. Run `yarn` in the root directory and `yarn start` to view your project on [http://localhost:5173](http://localhost:5173/)

3. Visit `src/config` and adjust `algoliaEnvConfig` to point to your own app, indices and API keys. If you do not need an index which is present in that file i.e. for articles, please do not remove it, just leave it as is, and you can turn off the relevant feature in the next step.

4. Visit `src/config` and adjust `featuresConfig` to activate/deactivate the features you would like to see in the app.

5. Go through the other files in `src/config` and adjust them according to your own data and requirements, each file describes itself.

6. In `src/config` , pay particular attention to `hitsConfig` as this is where we map your own attribute names to those used in the app. You should never adjust the attributes used in the app itself, only this map.

7. Run and test your app locally, if you have any questions or find any issues please raise an issue with us here https://github.com/algolia/algolia-react-boilerplate/issues.

8. In the `src/scss` folder, adjust any styling you need to based on what you see.

9. Preferably you can use Netlify to deploy your project, but you can use other deployment tools.

10. Log into Netlify on the Algolia Demos team (again ask #help-demos if you don't have access) and deploy your demo from Github, making sure to password protect it!
