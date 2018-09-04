const txDataAggregator = require('./txDataAggregator.js');

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
    
    console.log(blockArray[0]);
    console.log('**************', blockArray.length, blockArray[0].length);

    // return {
    //     totalEther: 0,
    //     sendingAddresses: {}, // key - address: value - total amount sent
    //     receivingAddresses: {}, // key - address: value - total amount received
    //     contractAddresses: [] // unique list
    // };
}
main(6008149, 6008159);

function getTotalEther(txArray) {
    // returns total amount of transferred Ether from block range

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
