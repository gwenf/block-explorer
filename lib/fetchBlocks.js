'use strict';

const axios = require('axios');
const web3 = require('web3');

const INFURA_URL = 'https://api.infura.io/v1/jsonrpc/mainnet/';

async function getLatestBlock() {
    try {
        const res = await axios(INFURA_URL + 'eth_blockNumber?token=' + process.env.API_KEY);
        return res.data.result;
    } catch(err) {
        console.log(err);
    }
}

async function getBlockByNum(num) {
    const blockNum = web3.utils.toHex(num);
    const url = `${INFURA_URL}eth_getBlockByNumber?token=${process.env.API_KEY}&params=["${blockNum}",false]`;
    try {
        const res = await axios(url);
        return res.data.result;
    } catch(err) {
        console.log(err);
    }
}

async function getTransactionByHash(txHash) {
    const url = `${INFURA_URL}eth_getTransactionByHash?token=${process.env.API_KEY}&params=["${txHash}"]`;
    try {
        const res = await axios(url);
        return res.data;
    } catch(err) {
        console.log(err);
    }
}

const blockApi = {
    getBlockByNum,
    getLatestBlock,
    getTransactionByHash
};

module.exports = blockApi;
