#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('inquirer');

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
            
            await bexApp(answers);

            if (answers.action !== 'Exit') {
                console.log(chalk.white('----------------------------'));
                return chooseAction();
            } else {
                console.log(chalk.white('Have a nice day!'));
                return ;
            }
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

// program
//     .version('1.2.1')
//     .option('-i, --init [apiKey]', 'Create .env file')
//     .option('-s, --start [startBlock]', 'Denote integer value of start block')
//     .option('-e, --end [endBlock]', 'Denote integer value of end block')
//     .option('-c, --contract', 'Boolean for including contract address list in results')
//     .option('-l, --latest', 'Get number of latest block')
//     .parse(process.argv);

(async function main() {
    // if (program.init) {
    //     return ;
    // }

    // clear();

    // console.log(chalk.yellow(figlet.textSync('BXE', { horizontalLayout: 'full' })));
    // console.log(chalk.white('Ethereum Blockchain Explorer'));
    
    // if (program.start) {
    //     console.log(chalk.blue('The blockrange is:'), `${data.start}-${data.end}`);
    //     console.log(chalk.blue('The total Ether is:'), data.blockData.totalEther);
    //     console.log(chalk.magenta('Sending addresses:'), data.blockData.sendingAddresses);
    //     console.log(chalk.magenta('Receiving addresses:'), data.blockData.receivingAddresses);
    // } else if (program.latest) {
    //     console.log(chalk.blue('This is the latest Ethereum block mined:'), `${chalk.underline(data.latest)} (hex)`, `${chalk.underline(data.latestInt)} (int)`);
    // } else {
    //     console.log(chalk.red('Invalid entry. Use --help flag to see full list of commands.'));
    // }
})()
