#!/usr/bin/env node

const fs = require('fs');
const program = require('commander');
const web3 = require('web3');
require('dotenv').config();

var bexLibrary = require('../lib/index.js');

program
    .version('1.0.0')
    .option('-i, --init [apiKey]', 'Create .env file')
    .option('-s, --start [startBlock]', 'Denote integer value of start block')
    .option('-e, --end [endBlock]', 'Denote integer value of end block')
    .option('-c, --contract', 'Include contract address list')
    .option('-l, --latest', 'Get number of latest block')
    .parse(process.argv);

(async function main() {
    if (program.init) {
        fs.writeFile('.env', `API_KEY=${program.init}`, 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }

            console.log('Your .env file was created successfully!');
        }); 
    } else if (program.start) {
        const start = parseInt(web3.utils.hexToNumberString(program.start), 10);
        let end = program.end;

        if (!end) {
            end = await bexLibrary.fetchBlocks.getLatestBlock();
        }
        end = parseInt(web3.utils.hexToNumberString(end), 10);

        console.log(`The blockrange is: ${start}-${end}`);

        if (end < start) {
            console.log('Ending block value must be greater than start.');
            return false;
        }
        // TODO: limit the amount of blocks to be processed
        // TODO: figure out how to be more memory efficient

        console.log('Processing... This may take a minute.');
        bexLibrary.getData(program.start, end, program.contract);
    } else if (program.latest) {
        const latest = await bexLibrary.fetchBlocks.getLatestBlock();
        const latestInt = parseInt(web3.utils.hexToNumberString(latest), 10);

        console.log('This is the latest Ethereum block mined:', `${latest} (hex)`, `${latestInt} (int)`);
    } else {
        console.log('Invalid entry. Use --help flag to see full list of commands.')
    }
})()
