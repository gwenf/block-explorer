const web3 = require('web3');
const chalk = require('chalk');
require('dotenv').config();

var bexLibrary = require('../lib/index.js');

async function main(program) {
    if (program.start) {
        const start = parseInt(web3.utils.hexToNumberString(program.start), 10);
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
    } else if (program.latest) {
        const latest = await bexLibrary.fetchBlocks.getLatestBlock();
        const latestInt = parseInt(web3.utils.hexToNumberString(latest), 10);

        return {
            latest,
            latestInt
        }
    }
}

module.exports = main;
