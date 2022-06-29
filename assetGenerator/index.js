// This file is a tool that will help you create rules without having to consult any specific custom data syntax.

import chalk from 'chalk';
import { Command } from 'commander';
import inquirer from 'inquirer';
import assetTemplates from './assetTemplates.js';
import { deleteEmptyFields, transformTitle } from './templateHelper.js';

function assetGenerator() {
  // Print welcome message
  console.log(
    chalk.bold.yellow(
      '\n---------------------Welcome to the Asset Generator!---------------------'
    )
  );

  // Set up the commander instance and execute it
  try {
    setUpCommander().parseAsync(process.argv);
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
      .action(async () => {
        // Print command mode
        console.log(
          `==> Generating ${chalk.cyan.bold(transformTitle(assetName))}`
        );

        return promptForAssetProperties(assetDefinitions).then((result) =>
          console.log(`\n${result}\n`)
        );
      });
  });

  return mainCommand;
}

// Prompts for the given asset template's properties data
// Returns the JSON object of the constructed asset
async function promptForAssetProperties(assetTemplate) {
  // Prompt questions for each of the properties in the asset template
  // Inquirer already builds the answers in the exact format we will need
  return inquirer
    .prompt(questionsFromProperties(assetTemplate))
    .then((answers) => {
      // Add any _add "constant" properties to the final object
      if ('_add' in assetTemplate) {
        answers = {
          ...answers,
          ...assetTemplate._add,
        };
      }

      return JSON.stringify(deleteEmptyFields(answers), null, '  ');
    });
}

// Goes through each property of the given object, creates questions from it, and then returns all the created questions
// The name prefix should be used when defining subproperties, and simply modifies the properties names to be prefixed, like so '<namePrefix>.<property-name>'
function questionsFromProperties(object, namePrefix) {
  // Questions
  const questions = [];

  // Construct the questions
  for (let [propertyName, propertyDefinition] of Object.entries(object)) {
    // Note: usually, one property = one question. But if the property contains subproperties, it will result in more than one

    // Add the questions
    questions.push(
      ...makeQuestions(
        namePrefix ? `${namePrefix}.${propertyName}` : propertyName,
        propertyDefinition
      )
    );
  }

  return questions;
}

// Given the property name & definition, returns an array with all the questions corresponding to it
function makeQuestions(name, definition) {
  // Skip metadata fields
  const firstFieldLetterIndex = name.indexOf('.') + 1;
  if (name[firstFieldLetterIndex] == '_') return [];

  // Detect optional questions
  let optional = definition.optional && definition.default == undefined;
  if (name[name.length - 1] == '?') {
    name = name.slice(0, -1);
    optional = definition.default == undefined;
  }

  // If not optional, add not empty validator
  let validate = () => true;

  if (!optional) {
    // Store previous validator in case it already had one
    const previousValidator = definition.validate;

    validate = (input) => {
      if (!input) return `Property ${name} is required`;

      if (previousValidator != undefined) return previousValidator();

      return true;
    };
  }

  // Helper to make a questions' message
  const makeMessage = (title, description) =>
    transformTitle(title) +
    chalk.dim(` (${description})`) +
    (optional ? chalk.yellow(' Optional') : '');

  // In case of a string definition
  if (typeof definition === 'string' || definition instanceof String) {
    // Build a simple question
    return [
      {
        name: name,
        message: makeMessage(name, definition),
        validate,
      },
    ];
  }

  // In case it has subproperties
  if ('_subproperties' in definition) {
    return questionsFromProperties(definition, name);
  }

  // It must be an object with special annotations
  if (typeof definition !== 'object') {
    throw new Error(
      `Invalid definition for property ${name}: ${JSON.stringify(definition)}`
    );
  }

  // It must also contain a description field
  if ('description' in definition == false) {
    throw new Error(
      `Definition for property "${name}" is missing a description field`
    );
  }

  // Build question
  return [
    {
      ...definition,
      name: name,
      message: makeMessage(name, definition.description),
      validate,
    },
  ];
}

// Execute it
assetGenerator();
