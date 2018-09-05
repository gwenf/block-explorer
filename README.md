# Ethereum Block Explorer (BEX)

This is a command line tool built using Node.js and the Infura API.

This app was built to be used as a global module but you can also clone it and run it locally (`npm run dev`) for testing.

## Steps to run the app as a global module:

1. You will need to set up an API key with Infura. Go to [infura.io](https://infura.io) and follow steps to set up your account.
2. `npm i -g bex`
3. Configure `.env` file with this command:

```js
bex --init [YOUR_API_KEY]
// e.g.
bex --init 1a1a1a1a1a1a1a1a1a1a1a1a1a1a1
```

4. Run the program: `bex [options]`
5. `npm test` to lint and test the app

## API Reference

### Get latest block

```js
bex -l
// or
bex --latest
```

### Get info about a block range

```js
bex --start [startingBlockNumber] --end [endingBlockNumber]
// e.g.
bex --start 6008149 --end 6008153
```

```js
// you can also only denote a start block and the end block will default to the latest on the Ethereum blockchain
bex --start 6008149
```
