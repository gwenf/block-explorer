'use strict';

// connect to infura
// get information back about blocks
// search for specific block ranges, either block number to present or start and end blocks
// get info about the sender and receiver
// save all the info of all senders/receivers from a specific range of blocks

console.log(process.env.ETH_ENDPOINT);

const fetchBlocks = require('./fetchBlocks.js');

const bexApp = {
    fetchBlocks
};

module.exports = bexApp;
