const fetchBlocks = require('./fetchBlocks.js');

let data;

function main() {
    // this function will call all the helper functions below to glean all metadata from transactions and return object

    return {
        totalEther: 0,
        sendingAddresses: {}, // key - address: value - total amount sent
        receivingAddresses: [], // key - address: value - total amount received
        contractAddresses: []
    };
}
main();

function getTotalEther() {
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
