module.exports = {
    topLevel: {
        type : 'list',
        name : 'action',
        message : 'What would you like to do?',
        choices: [
            {name: 'Get number of latest block.', value: 'latest'},
            {name: 'Get info from block range.', value: 'range'},
            {
                type: 'confirm',
                name: 'Exit',
                message: 'Would you like to perform another action (just hit enter for YES)?',
                default: false
            }
        ]
    },
    blockInfo: [
        {
            type: 'input',
            name: 'start',
            message: 'Enter a start block:'
        },
        {
            type: 'input',
            name: 'end',
            default: 'latest',
            message: 'Enter a end block (leave blank for latest block mined):'
        }
    ]
};

