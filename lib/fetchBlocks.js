'use strict';

const axios = require('axios');

const INFURA_URL = 'https://api.infura.io/v1/jsonrpc/mainnet/';

async function getData() {
    try {
        console.log('hello');
        const res = await axios(INFURA_URL + 'eth_blockNumber?token=' + process.env.API_KEY);
        console.log(res)
        return res;
    } catch(err) {
        console.log(err);
    }
}
getData();

const blockApi = {
    getData
};

module.exports = blockApi;
