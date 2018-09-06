const fs = require('fs');
const expect = require('expect');
const web3 = require('web3');
const chalk = require('chalk');

const bexApp = require('../bin/app');

runEnvInitTest();
runLatestBlockTest();
runBlockRangeTest();

async function runEnvInitTest() {
    // TODO: save copy of .env file and reset to original state after
    console.log('Running init test...');
    program = {
        init: '1a1a1a1a1a1a1a1a1a1a1a1a1a1a1',
    };
    await bexApp(program);

    fs.readFile('.env', 'utf8', function(err, contents) {
        if (err) throw new Error(err);

        expect(contents).toEqual('API_KEY=1a1a1a1a1a1a1a1a1a1a1a1a1a1a1');
        console.log(chalk.cyan('Test Passed: .env file successfully created!'));
    });
}

async function runLatestBlockTest() {
    console.log('Retrieving latest block...');
    program = {
        latest: true
    };
    const res = await bexApp(program);

    expect(res.latestInt).toEqual(parseInt(web3.utils.hexToNumberString(res.latest), 10));
    console.log(chalk.cyan('Test Passed: retrieved latest Ethereum block successfully!'));
}

async function runBlockRangeTest() {
    console.log('Running block range test...');
    program = {
        start: 6008149,
        end: 6008152,
    };
    const res = await bexApp(program);

    expect(res).toHaveProperty('start');
    expect(res).toHaveProperty('end');
    expect(res).toHaveProperty('blockData');
    expect(res.blockData).toHaveProperty('totalEther');
    expect(res.blockData).toHaveProperty('sendingAddresses');
    expect(res.blockData).toHaveProperty('receivingAddresses');
    console.log(chalk.cyan('Test Passed: successfully retrieved block data from range of blocks!'));
}
