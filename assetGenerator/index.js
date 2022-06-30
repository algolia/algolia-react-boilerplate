// This file is a tool that will help you create rules without having to consult any specific custom data syntax.
import algoliasearch from 'algoliasearch'
import chalk from 'chalk'
import { Command } from 'commander'
import dotenv from 'dotenv'
import fs from 'fs'
import inquirer from 'inquirer'
import path from 'path'
import { fileURLToPath } from 'url'
import assetTemplates from './assetTemplates.js'
import { deleteEmptyFields, transformTitle } from './templateHelper.js'

dotenv.config()

function assetGenerator() {
  // Print welcome message
  console.log(
    chalk.bold.yellow(
      '\n---------------------Welcome to the Asset Generator!---------------------'
    )
  )

  // Set up the commander instance and execute it
  try {
    setUpCommander().then(commander => commander.parseAsync(process.argv))
  } catch (error) {
    console.error(chalk.red('Error while parsing asset templates: '), error)
  }
}

// Sets up the commander instance
async function setUpCommander() {
  // Create the main command
  const mainCommand = new Command()
    .version('1.0.0')
    .option(
      '-c --create-rule',
      'When set, the command will also prompt the user for a rule trigger (in JSON format) and automatically generate a rule that returns the custom data. Uses your default text editor, configured by the $VISUAL or $EDITOR environment variables. If not set, uses vim or notepad.'
    )

  // For each of the assets defined, create a subcommand to generate it
  Object.entries(assetTemplates).forEach(([assetName, assetDefinitions]) => {
    // Make sure it contains a description
    if (assetDefinitions._description == undefined) {
      throw new Error('All asset definitions must have a _description field')
    }

    // Create the subcommand
    mainCommand
      // Name it the asset's name
      .command(assetName)
      // Give it the asset's description
      .description(assetDefinitions._description)
      // Start routine to prompt for this asset's properties data, then log the result
      .action(async (_, command) => {
        // Print command mode
        console.log(
          `==> Generating ${chalk.cyan.bold(transformTitle(assetName))}`
        )

        // Find out whether to create the rule directly
        const { createRule } = command.parent._optionValues

        // Store the algolia index, if necessary
        let index

        if (createRule) {
          console.log(
            `\
==> Will prompt for rule trigger and automatically create rule.
  ${chalk.blue(
    '> Note: Will use your default configured editor. See the help command for more information'
  )}`
          )

          index = await getIndex()
        }

        return promptForAssetProperties(assetDefinitions).then(async result => {
          // If need to create rule, prompt for it's trigger
          if (createRule) await createRuleFromData(result, index)

          // Show the resulting asset
          console.log(`\n${result}\n`)
        })
      })
  })

  return mainCommand
}

// Prompts for the given asset template's properties data
// Returns the JSON object of the constructed asset
async function promptForAssetProperties(assetTemplate) {
  // Prompt questions for each of the properties in the asset template
  // Inquirer already builds the answers in the exact format we will need
  return inquirer
    .prompt(questionsFromProperties(assetTemplate))
    .then(answers => {
      // Add any _add "constant" properties to the final object
      if ('_add' in assetTemplate) {
        answers = {
          ...answers,
          ...assetTemplate._add,
        }
      }

      return JSON.stringify(deleteEmptyFields(answers), null, '  ')
    })
}

// Goes through each property of the given object, creates questions from it, and then returns all the created questions
// The name prefix should be used when defining subproperties, and simply modifies the properties names to be prefixed, like so '<namePrefix>.<property-name>'
function questionsFromProperties(object, namePrefix) {
  // Questions
  const questions = []

  // Construct the questions
  for (let [propertyName, propertyDefinition] of Object.entries(object)) {
    // Note: usually, one property = one question. But if the property contains subproperties, it will result in more than one

    // Add the questions
    questions.push(
      ...makeQuestions(
        namePrefix ? `${namePrefix}.${propertyName}` : propertyName,
        propertyDefinition
      )
    )
  }

  return questions
}

// Given the property name & definition, returns an array with all the questions corresponding to it
function makeQuestions(name, definition) {
  // Skip metadata fields
  const firstFieldLetterIndex = name.indexOf('.') + 1
  if (name[firstFieldLetterIndex] == '_') return []

  // Detect optional questions
  let optional = definition.optional && definition.default == undefined
  if (name[name.length - 1] == '?') {
    name = name.slice(0, -1)
    optional = definition.default == undefined
  }

  // If not optional, add not empty validator
  let validate = () => true

  if (!optional) {
    // Store previous validator in case it already had one
    const previousValidator = definition.validate

    validate = input => {
      if (!input) return `Property ${name} is required`

      if (previousValidator != undefined) return previousValidator()

      return true
    }
  }

  // Helper to make a questions' message
  const makeMessage = (title, description) =>
    transformTitle(title) +
    chalk.dim(` (${description})`) +
    (optional ? chalk.yellow(' Optional') : '')

  // In case of a string definition
  if (typeof definition === 'string' || definition instanceof String) {
    // Build a simple question
    return [
      {
        name: name,
        message: makeMessage(name, definition),
        validate,
      },
    ]
  }

  // In case it has subproperties
  if ('_subproperties' in definition) {
    return questionsFromProperties(definition, name)
  }

  // It must be an object with special annotations
  if (typeof definition !== 'object') {
    throw new Error(
      `Invalid definition for property ${name}: ${JSON.stringify(definition)}`
    )
  }

  // It must also contain a description field
  if ('description' in definition == false) {
    throw new Error(
      `Definition for property "${name}" is missing a description field`
    )
  }

  // Build question
  return [
    {
      ...definition,
      name: name,
      message: makeMessage(name, definition.description),
      validate,
    },
  ]
}

// Prompts for a rule trigger JSON and creates the rule
async function createRuleFromData(assetData, index) {
  // Generates the id for the new rule
  const ruleId = `asset-generator-created-${Math.round(
    Math.random() * 10000000
  )}`

  // Prompt a single question, asking for the rule's trigger as JSON
  return inquirer
    .prompt([
      {
        // Input the rule trigger through editor
        type: 'editor',
        name: '_ruleTrigger',
        message:
          "Please, enter the rule's trigger as JSON. It should be an object with the 'conditions' key. Provide an empty object to create a conditionless rule",
        default: `{
  "conditions": [{
    "pattern": "",
    "anchoring": "is"
  }]
}`,
        // Ensure the input is a valid JSON
        validate: input => {
          try {
            JSON.parse(input)
          } catch {
            return 'Invalid JSON'
          }

          return true
        },
      },
      {
        name: '_ruleDescription',
        message: 'You may provide a description, or leave blank',
        default: 'Generated through the asset generator',
      },
    ])
    .then(async ({ _ruleTrigger, _ruleDescription }) => {
      // Build the rule
      const rule = {
        objectID: ruleId,

        // Add the condition
        ...JSON.parse(_ruleTrigger),

        // Add the consequence
        consequence: {
          userData: JSON.parse(assetData),
        },

        // Add a description
        description: _ruleDescription,
      }

      // Create rule
      console.log('==> Saving rule... ')

      await index
        .saveRule(rule)
        .then(() => console.log('==> Done!'))
        .catch(error =>
          console.log(
            chalk.red(
              '==> Error: your api key is probably invalid, or lacks the authorization to create rules.'
            ) + ' You can edit it at the local .env file. Algolia message:\n',
            JSON.stringify(error, null, '  ')
          )
        )
    })
}

// Gets data from the algolia index
async function getIndex() {
  // Get index config
  const __filename = fileURLToPath(import.meta.url)

  const __dirname = path.dirname(__filename)

  // Get main index data
  const { mainIndex, appId } = JSON.parse(
    fs.readFileSync(__dirname + '/../src/config/algoliaEnvData.json')
  )

  // The name of the env variable with the api key
  const apiKeyVariableName = 'RULE_API_KEY'

  // Get api key
  let apiKey = process.env.RULE_API_KEY

  // Check if api key is defined
  if (apiKey == undefined) {
    // If so, ask for it
    await inquirer
      .prompt([
        {
          name: '_apiKey',
          message:
            'Please, provide API key with rule writing privileges.' +
            chalk.red(
              ' It will be saved to a .env file, so make sure to include this file in your .gitignore'
            ),
          validate: input => (input.length < 30 ? 'Invalid API key' : true),
        },
      ])
      .then(({ _apiKey: newApiKey }) => {
        // Store it to a .env file
        fs.writeFileSync(
          __dirname + '/.env',
          `${apiKeyVariableName}=${newApiKey}`
        )

        // Memorize it
        apiKey = newApiKey
      })
  }

  // Get the index
  try {
    const index = algoliasearch(appId, apiKey).initIndex(mainIndex)

    return index
  } catch {
    throw new Error(
      'Invalid Algolia credentials. Please, check the algoliaEnvData file and the local .env file to ensure your appId, apiKey and index name are correct'
    )
  }
}

// Execute it
assetGenerator()
