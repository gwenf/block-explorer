#!/usr/bin/env node

const program = require('commander');
require('dotenv').config();

var bexLibrary = require('../lib/index.js');

program
    .version('1.0.0')
    .option('-s, --start', 'Start Block')
    .option('-e, --end', 'End Block')
    .parse(process.argv);

console.log('The blockrange is:');
if (program.start) console.log('  - start');
if (program.end) console.log('  - end');
