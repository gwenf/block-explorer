'use strict';

const txDataAggregator = require('./txDataAggregator.js');
const fetchBlocks = require('./fetchBlocks.js');
const web3 = require('web3');

let data;

async function main(blockStart, blockEnd) {
    const range = [...Array(blockEnd - blockStart).keys()];

    const blockArray = await Promise.all(range.map(async (num) => {
        const block = await txDataAggregator(blockStart + num);
        return block;
    })).then((result) => {
        return result;
    });

    return {
        ...getBlockData(blockArray)
    };
}
// main(6008149, 6008154);

async function getBlockData(blockArray) {
    let totalWei = 0;
    let sendingAddresses = {};
    let receivingAddresses = {};
    let contractsList = [];

    for (let i = 0; i < blockArray.length; i++) {
        for (let j = 0; j < blockArray[i].length; j++) {
            const { from, to, value, blockNumber } = blockArray[i][j].result;
            const intVal = parseInt(web3.utils.hexToNumberString(value), 10);

            const blockNum = web3.utils.hexToNumberString(blockNumber);
            const contract = await fetchBlocks.checkContract(to, blockNum);
            if (to && contract !== '0x') {
                if (contractsList.indexOf(to) === -1) contractsList.push(to);
            }

            totalWei += intVal;
            sendingAddresses[from] = sendingAddresses[from] + intVal;
            receivingAddresses[to] = receivingAddresses[to] + intVal;
        }
    }
    console.log(contractsList);

    const totalEther = web3.utils.fromWei(totalWei.toString(), 'ether');
    return {
        totalEther,
        sendingAddresses,
        receivingAddresses,
        contractsList
    };
}

module.exports = data;
