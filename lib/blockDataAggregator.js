'use strict';
// if you want to manually run this file for testing: main(6008149, 6008153, false);

const txDataAggregator = require('./txDataAggregator.js');
const fetchBlocks = require('./fetchBlocks.js');
const web3 = require('web3');

async function main(blockStart, blockEnd, getContracts) {
    // The `getContracts` argument is a boolean value for a user to choose to include
    // a list of contracts in the final output

    const range = [...Array(blockEnd - blockStart).keys()];

    const blockArray = await Promise.all(range.map(async (num) => {
        const block = await txDataAggregator(parseInt(blockStart, 10) + num);
        return block;
    })).then((result) => {
        return result;
    });

    return {
        ...await getBlockData(blockArray, getContracts)
    };
}

async function getBlockData(blockArray, getContracts) {
    let totalWei = 0;
    let sendingAddresses = {};
    let receivingAddresses = {};
    let contractsList = [];

    for (let i = 0; i < blockArray.length; i++) {
        for (let j = 0; j < blockArray[i].length; j++) {
            const { from, to, value, blockNumber } = blockArray[i][j].result;
            const intVal = parseInt(web3.utils.hexToNumberString(value), 10);

            if (getContracts) {
                const blockNum = web3.utils.hexToNumberString(blockNumber);
                const contract = await fetchBlocks.checkContract(to, blockNum);
                if (to && contract !== '0x') {
                    if (contractsList.indexOf(to) === -1) contractsList.push(to);
                }
            }

            totalWei += intVal;
            sendingAddresses[from] = sendingAddresses[from] ? sendingAddresses[from] + intVal : intVal;
            if (to) {
                receivingAddresses[to] = receivingAddresses[to] ? receivingAddresses[to] + intVal : intVal;
            }
        }
    }

    // const totalEther = web3.utils.fromWei(totalWei.toString(), 'ether');
    return {
        // totalEther,
        sendingAddresses,
        receivingAddresses,
        contractsList
    };
}

module.exports = main;
