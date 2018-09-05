'use strict';

const getData = require('./blockDataAggregator');
const fetchBlocks = require('./fetchBlocks');

const bexApp = {
    getData,
    fetchBlocks
};

module.exports = bexApp;
