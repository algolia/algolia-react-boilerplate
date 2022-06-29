// This file is a tool that will help you create rules without having to consult any specific custom data syntax.

// Guides I used to build this:
//    https://medium.com/skilllane/build-an-interactive-cli-application-with-node-js-commander-inquirer-and-mongoose-76dc76c726b6
//    https://www.youtube.com/watch?v=_oHByo8tiEY

import { Command } from 'commander';
import chalk from 'chalk';
import assetTemplates from './assetTemplates.js';

function assetGenerator() {
  // Print welcome message
  console.log(
    chalk.bold.yellow(
      '\n---------------------Welcome to the Asset Generator!---------------------'
    )
  );

  // Set up the commander instance and execute it
  try {
    setUpCommander().parse(process.argv);
  } catch (error) {
    console.error(chalk.red('Error while parsing asset templates: '), error);
  }
}

// Sets up the commander instance
function setUpCommander() {
  // Create the main command
  const mainCommand = new Command().version('1.0.0');

  // For each of the assets defined, create a subcommand to generate it
  Object.entries(assetTemplates).forEach(([assetName, assetDefinitions]) => {
    // Make sure it contains a description
    if (assetDefinitions._description == undefined) {
      throw new Error('All asset definitions must have a _description field');
    }

    // Create the subcommand
    mainCommand
      // Name it the asset's name
      .command(assetName)
      // Give it the asset's description
      .description(assetDefinitions._description)
      // Start routine to prompt for this asset's properties data, then log the result
      .action(() => console.log(promptForAssetProperties(assetDefinitions)));
  });

  // Prompts for the given asset template's properties data
  // Returns the JSON object of the constructed asset
  function promptForAssetProperties(assetTemplate) {
    const asset = {};

    return JSON.stringify(asset);
  }

  return mainCommand;
}

// Execute it
assetGenerator();
