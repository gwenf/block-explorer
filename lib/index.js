'use strict';

// TODO:
// look up transactions from returned list to get info about the sender and receiver
// I need to make a script to automatically create the .env file for people

const getData = require('./blockDataAggregator.js');

const bexApp = {
    getData
};

module.exports = bexApp;
