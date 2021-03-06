# Ethereum Block Explorer (BEX)

This is a command line tool built using Node.js and the Infura API.

This app was built to be used as a global module but you can also clone it and run it locally (`npm run dev`) for testing.

*Please raise issues for suggested improvements or bugs.* :)

# Version 2.x Instructions

*Version 2 was upgraded to have a more interactive interface for the cli.*

## Setup & Run the app as a global module:

1. You will need to set up an API key with Infura. Go to [infura.io](https://infura.io) and follow steps to set up your account.
2. `npm install -g blockx`

**Initialize the app with Infura:**

Configure `.env` file with this command:

```js
bex init [YOUR_API_KEY]
// or
bex i [YOUR_API_KEY]
```

## Interface

**Run the application:**

```js
bex run
// or
bex r
```

Then follow the prompts to get the information you want.

# Version 1.x Instructions

## Steps to run the app as a global module:

1. You will need to set up an API key with Infura. Go to [infura.io](https://infura.io) and follow steps to set up your account.
2. `npm install -g blockx`
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

### API Help

```js
bex --help
```

## Roadmap

* [ ] upgrade/fix testing
* [ ] performance upgrades
