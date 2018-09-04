'use strict';

const txDataAggregator = require('./txDataAggregator.js');
const web3 = require('web3');

let data;

async function main(blockStart, blockEnd) {
    // this function will call all the helper functions below to glean all metadata from transactions and return object
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
main(6008149, 6008154);

function getBlockData(blockArray) {
    let totalWei = 0;
    let sendingAddresses = {};
    let receivingAddresses = {};

    for (let i = 0; i < blockArray.length; i++) {
        for (let j = 0; j < blockArray[i].length; j++) {
            const { from, to, value } = blockArray[i][j].result;
            const intVal = parseInt(web3.utils.hexToNumberString(value), 10);

            totalWei += intVal;
            sendingAddresses[from] = sendingAddresses[from] + intVal;
            receivingAddresses[to] = receivingAddresses[to] + intVal;
        }
    }

    const totalEther = web3.utils.fromWei(totalWei.toString(), 'ether');
    return {
        totalEther,
        sendingAddresses,
        receivingAddresses
    };
}

function getContractAddresses() {

}

module.exports = data;
