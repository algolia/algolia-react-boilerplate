---
sidebar_position: 1
---

# Pre-requisites

Before proceeding, please make sure you have the following:

- Node v16.14+ installed
- pnpm installed [here](https://pnpm.io/).

## Installing and initial setup

1. For using the Boilerplate for your own project, use a template of the repo under a new name for your own demo. You should use the `main` branch that has some features turned off for easier setup.

2. Run `pnpm install` in the **boilerplate root** directory and `pnpm start:front` to view your project on [http://localhost:3000](http://localhost:3000/).
   You may run into errors at this stage if you haven't configured `algoliaEnvConfig`. You are likely to see some more errors soon after. Visit `src/config/featuresConfig` to activate/deactivate the features you would like to see in the app.
   More details on all of these steps are laid out in these docs.

3. Visit `src/config` and adjust `algoliaEnvConfig` to point to your own app, indices and API keys. If you do not need an index which is present in that file i.e. for articles, please do not remove it, just leave it as is, and you can turn off the relevant feature in the next step.

4. Run and test your app locally, if you have any questions or find any issues please raise an issue with us here https://github.com/algolia/algolia-react-boilerplate/issues.

5. We recommend you use Netlify to deploy your project, but you can use other deployment tools as well if you like.

## Contributing

If you wish to contribute to the project, the clone the repo instead of using a template.

When making a PR, please ensure that you are selecting the correct base branch to pull into.
