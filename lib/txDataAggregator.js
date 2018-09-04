const fetchBlocks = require('./fetchBlocks.js');

async function main(blockNum) {
    // this function will call all the helper functions below to glean all metadata from transactions and return object
    const block = await fetchBlocks.getBlockByNum(blockNum);

    const txArray = await Promise.all(block.transactions.map(async (txHash) => {
        const tx = await fetchBlocks.getTransactionByHash(txHash);
        return tx;
    })).then((result) => {
        return result;
    });

    return txArray;
}
main(6008149);

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

module.exports = main;
