#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');

const bexApp = require('./app');

program
    .version('1.2.0')
    .option('-i, --init [apiKey]', 'Create .env file')
    .option('-s, --start [startBlock]', 'Denote integer value of start block')
    .option('-e, --end [endBlock]', 'Denote integer value of end block')
    .option('-c, --contract', 'Boolean for including contract address list in results')
    .option('-l, --latest', 'Get number of latest block')
    .parse(process.argv);

(async function main() {
    const data = await bexApp(program);

    if (program.init) {
        return ;
    }
    
    if (program.start) {
        console.log(chalk.blue('The blockrange is:'), `${data.start}-${data.end}`);
        console.log(chalk.blue('The total Ether is:'), data.blockData.totalEther);
        console.log(chalk.magenta('Sending addresses:'), data.blockData.sendingAddresses);
        console.log(chalk.magenta('Receiving addresses:'), data.blockData.receivingAddresses);
    } else if (program.latest) {
        console.log(chalk.blue('This is the latest Ethereum block mined:'), `${chalk.underline(data.latest)} (hex)`, `${chalk.underline(data.latestInt)} (int)`);
    } else {
        console.log(chalk.red('Invalid entry. Use --help flag to see full list of commands.'));
    }
})()
