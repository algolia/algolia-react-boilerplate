---
sidebar_position: 1
---

# Pre-requisites

Before proceeding, please make sure you have the following:

- Node v16.0.0+ installed
- Yarn installed

## Installing and initial setup

1. If you haven't already, clone the parent repo under a new name for your own demo. You should use the `main` branch that has some features turned off for easier setup.

2. Run `yarn` in the root directory and `yarn start` to view your project on [http://localhost:5173](http://localhost:5173/).
   You may run into errors at this stage if you haven't configured `algoliaEnvConfig`. You are likely to see some more errors soon after. Visit `src/config/featuresConfig` to activate/deactivate the features you would like to see in the app.
   More details on all of these steps are laid out in these docs.

3. Visit `src/config` and adjust `algoliaEnvConfig` to point to your own app, indices and API keys. If you do not need an index which is present in that file i.e. for articles, please do not remove it, just leave it as is, and you can turn off the relevant feature in the next step.

4. Run and test your app locally, if you have any questions or find any issues please raise an issue with us here https://github.com/algolia/algolia-react-boilerplate/issues.

5. We recommend you use Netlify to deploy your project, but you can use other deployment tools as well if you like.
