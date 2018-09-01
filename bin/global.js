#!/usr/bin/env node

const program = require('commander');
require('dotenv').config();

var bexLibrary = require('../lib/index.js');

program
    .version('0.1.0')
    .option('-s, --start', 'Start Block')
    .option('-e, --end', 'End Block')
    .parse(process.argv);

console.log('you ordered a pizza with:');
if (program.peppers) console.log('  - peppers');
if (program.pineapple) console.log('  - pineapple');
if (program.bbqSauce) console.log('  - bbq');
console.log('  - %s cheese', program.cheese);
