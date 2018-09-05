#!/usr/bin/env node

const fs = require('fs');
const program = require('commander');
require('dotenv').config();

var bexLibrary = require('../lib/index.js');

// TODO: need to pass variables in the command line
program
    .version('1.0.0')
    .option('-i, --init', 'Create .env file')
    .option('-s, --start [startBlock]', 'Start Block')
    .option('-e, --end [endBlock]', 'End Block')
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
        let end = program.end ? program.end : 'latest';
        console.log(`The blockrange is: ${program.start}-${end}`);

        if (end === 'latest') {
            end = await bexLibrary.fetchBlocks.getLatestBlock();
        }

        console.log(end);
    } else {
        console.log('Invalid entry. Use --help flag to see full list of commands.')
    }
})()
