'use strict';

const fetchBlocks = require('./fetchBlocks.js');

async function main(blockNum) {
    const block = await fetchBlocks.getBlockByNum(blockNum);

    const txArray = await Promise.all(block.transactions.map(async (txHash) => {
        const tx = await fetchBlocks.getTransactionByHash(txHash);
        return tx;
    })).then((result) => {
        return result;
    });

    return txArray;
}

module.exports = main;

