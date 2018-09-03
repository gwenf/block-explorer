const fetchBlocks = require('./fetchBlocks.js');

let data;

async function main(blockNum) {
    // this function will call all the helper functions below to glean all metadata from transactions and return object
    
    // get all transactions from this block
    const block = await fetchBlocks.getBlockByNum(blockNum);

    const txArray = await Promise.all(block.transactions.map(async (txHash) => {
        const tx = await fetchBlocks.getTransactionByHash(txHash);
        return tx;
    })).then((result) => {
        return result;
    });
    console.log('**************', txArray.length);

    return {
        totalEther: 0,
        sendingAddresses: {}, // key - address: value - total amount sent
        receivingAddresses: {}, // key - address: value - total amount received
        contractAddresses: [] // unique list
    };
}
main(6008149);

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
