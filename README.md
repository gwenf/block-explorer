# Ethereum Block Explorer (BEX)

This is a command line tool built using Node.js and the Infura API.

This app was built to be used as a global module but you can also clone it and run it locally for testing.

## Steps to run the app as a global module:

1. `npm i -g bex`
1. `bex [options]`

## Steps to run the app locally:

1. Set up an account and create an application on Infura
1. Set up a `.env` file with the following variable:
    * API_KEY=[YOUR_API_KEY]
1. `npm run dev` to run the app
1. `npm test` to lint and test the app
