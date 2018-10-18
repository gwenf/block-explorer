const web3 = require('web3');
const chalk = require('chalk');
const table = require('table').table;

var bexLibrary = require('../lib/index.js');

// TODO: should check if it's not a valid api key and let user know to check it
async function main(answer) {
    if (answer.action === 'range') {
        let { start, end } = answer.range;
        // this is temporary until the api allows for contracts again:
        let contract = null;

        if (end === 'latest') {
            end = await bexLibrary.fetchBlocks.getLatestBlock();
        }

        if (end < start) {
            console.log(chalk.red('Ending block value must be greater than start.'));
            return false;
        }
        // TODO: limit the amount of blocks to be processed?
        // TODO: figure out how to be more memory efficient when more blocks are processed

        console.log(chalk.yellow('Processing... This may take a minute.'));
        const blockData = await bexLibrary.getData(start, end, contract);

        console.log(chalk.blue('The blockrange is:'), `${start}-${end}`);
        console.log(chalk.blue('The total Ether is:'), blockData.totalEther);

        console.log(chalk.magenta('Sending addresses:'));
        console.log(table(Object.keys(blockData.sendingAddresses).map((key) => {
             return [key, blockData.sendingAddresses[key]];
        })));

        console.log(chalk.magenta('Receiving addresses:'));
        console.log(table(Object.keys(blockData.receivingAddresses).map((key) => {
            return [key, blockData.receivingAddresses[key]];
        })));

    } else if (answer.action === 'latest') {
        const latest = await bexLibrary.fetchBlocks.getLatestBlock();
        const latestInt = parseInt(web3.utils.hexToNumberString(latest), 10);

        console.log(
            chalk.blue('This is the latest Ethereum block mined:'),
            `${chalk.underline(latest)} (hex)`,
            `${chalk.underline(latestInt)} (int)`
        );
    }
}

module.exports = main;
