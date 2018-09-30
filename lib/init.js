const fs = require('fs');
const chalk = require('chalk');

module.exports = function init(apiKey) {
    fs.writeFile('.env', `API_KEY=${apiKey}`, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }

        console.log(chalk.blue('Your .env file was created successfully!'));
    });
};
