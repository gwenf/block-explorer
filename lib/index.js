'use strict';

const init = require('./init.js');
const getData = require('./blockDataAggregator');
const fetchBlocks = require('./fetchBlocks');

const bexApp = {
    init,
    getData,
    fetchBlocks
};

module.exports = bexApp;

