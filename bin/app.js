const web3 = require('web3');
const chalk = require('chalk');
const Table = require('cli-table'); // TODO: create tables to display information
require('dotenv').config();

var bexLibrary = require('../lib/index.js');

// TODO: should check if it's not a valid api key and let user know to check it
async function main(answer) {
    console.log(answer);
    if (answer.action === 'range') {
        const start = parseInt(web3.utils.hexToNumberString(answer), 10);
        let end = program.end;

        if (!end) {
            end = await bexLibrary.fetchBlocks.getLatestBlock();
        }
        end = parseInt(web3.utils.hexToNumberString(end), 10);

        if (end < start) {
            console.log(chalk.red('Ending block value must be greater than start.'));
            return false;
        }
        // TODO: limit the amount of blocks to be processed?
        // TODO: figure out how to be more memory efficient when more blocks are processed

        console.log(chalk.yellow('Processing... This may take a minute.'));
        const blockData = await bexLibrary.getData(program.start, end, program.contract);
        return {
            blockData,
            end,
            start
        };
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
