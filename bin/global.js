#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('inquirer');
require('dotenv').config();

const bexApp = require('./app');
var bexLibrary = require('../lib/index.js');

// TODO: add progress for api calls: https://www.npmjs.com/package/clui

program
    .version('2.0.0')
    .description('Command line ethereum blockchain explorere built in Node.js with Infura.');

program
    .command('init <apiKey>')
    .alias('i')
    .description('App setup: Create .env file.')
    .action((apiKey) => {
        bexLibrary.init(apiKey);
    });

program
    .command('run')
    .alias('r')
    .description('Get contact')
    .action(() => {
        clear();
        startLogs();

        (async function chooseAction() {

            // TODO: make a separate file for inquirer prompts
            const answers = await inquirer.prompt({
                type : 'list',
                name : 'action',
                message : 'What would you like to do?',
                choices: [
                    {name: 'Get number of latest block.', value: 'latest'},
                    {name: 'Get info from block range.', value: 'range'},
                    {
                        type: 'confirm',
                        name: 'Exit',
                        message: 'Would you like to perform another action (just hit enter for YES)?',
                        default: false
                    }
                ]
            })

            if (answers.action === 'Exit') {
                console.log(chalk.white('Have a nice day!'));
                return ;
            }

            if (answers.action === 'latest') {
                await bexApp(answers);
            } else if (answers.action === 'range') {
                // TODO: add validation here for valid block numbers + end must be greater than start or blank
                const questions = [
                    {
                        type: 'input',
                        name: 'start',
                        message: 'Enter a start block:'
                    },
                    {
                        type: 'input',
                        name: 'end',
                        default: 'latest',
                        message: 'Enter a end block (leave blank for latest block mined):'
                    }
                ];
                const range = await inquirer.prompt(questions);
                console.log(range);

                await bexApp({ action: answers.action, range });
            }

            console.log(chalk.white('----------------------------'));
            return chooseAction();
        })()
    });

program.parse(process.argv);

function startLogs() {
    console.log(chalk.yellow(figlet.textSync('BXE', { horizontalLayout: 'full' })));
    console.log(chalk.white('Ethereum Blockchain Explorer'));
    console.log('');
    console.log(chalk.white('----------------------------'));
    console.log('');
}

// OLD API REFERENCE TO BE REMOVED WHEN THERE IS PARITY BETWEEN VERSIONS 1 AND 2:
// program
//     .version('1.2.1')
//     .option('-i, --init [apiKey]', 'Create .env file')
//     .option('-s, --start [startBlock]', 'Denote integer value of start block')
//     .option('-e, --end [endBlock]', 'Denote integer value of end block')
//     .option('-c, --contract', 'Boolean for including contract address list in results')
//     .option('-l, --latest', 'Get number of latest block')
//     .parse(process.argv);
