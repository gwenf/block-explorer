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
        totalEther: getTotalEther(blockArray),
        sendingAddresses: {}, // key - address: value - total amount sent
        receivingAddresses: {}, // key - address: value - total amount received
        contractAddresses: [] // unique list
    };
}
main(6008149, 6008159);

function getTotalEther(blockArray) {
    let totalWei = 0;

    for (let i = 0; i < blockArray.length; i++) {
        for (let j = 0; j < blockArray[i].length; j++) {
            const hexVal = blockArray[i][j].result.value;
            const intVal = parseInt(web3.utils.hexToNumberString(hexVal), 10);
            totalWei += intVal;
        }
    }

    const totalEther = web3.utils.fromWei(totalWei.toString(), 'ether');
    return totalEther;
}

function getSendingAddresses() {

}

function getReceivingAddresses() {

}

function getContractAddresses() {

}

function getAllTransactionsByBlock() {

}

module.exports = data;
