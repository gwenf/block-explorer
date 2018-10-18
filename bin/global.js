#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('inquirer');
require('dotenv').config();

const bexApp = require('./app');
const bexLibrary = require('../lib/index');

const prompts = require('./prompts');

// TODO: add progress for api calls: https://www.npmjs.com/package/clui

program
    .version('2.1.0')
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

            const answers = await inquirer.prompt(prompts.topLevel);

            if (answers.action === 'Exit') {
                console.log(chalk.white('Have a nice day!'));
                return ;
            }

            if (answers.action === 'latest') {
                await bexApp(answers);
            } else if (answers.action === 'range') {
                const range = await inquirer.prompt(prompts.blockInfo);

                await bexApp({ action: answers.action, range });
            } else if (answers.action === 'contracts') {
                const contracts = await inquirer.prompt(prompts.blockInfo);

                await bexApp({ action: answers.action, contracts });
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
