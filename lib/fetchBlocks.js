'use strict';

const axios = require('axios');
const web3 = require('web3');

const INFURA_URL = 'https://api.infura.io/v1/jsonrpc/mainnet/';

async function getLatestBlock() {
    try {
        const res = await axios(INFURA_URL + 'eth_blockNumber?token=' + process.env.API_KEY);
        console.log(res.data)
        return res;
    } catch(err) {
        console.log(err);
    }
}
// getLatestBlock();

async function getBlockByNum(num) {
    const blockNum = web3.utils.toHex(num);
    const url = `${INFURA_URL}eth_getBlockByNumber?token=${process.env.API_KEY}&params=["${blockNum}",false]`;
    console.log(url);
    try {
        const res = await axios(url);
        console.log(res.data)
        return res;
    } catch(err) {
        console.log(err);
    }
}
getBlockByNum(6008149);

const blockApi = {
    getBlockByNum,
    getLatestBlock
};

module.exports = blockApi;
