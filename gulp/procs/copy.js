var settings = require('../settings');

module.exports = function (gulp, plugins, mode) {
    tasks = {
        dev: ['assets:images', 'assets:fonts', 'assets:misc', 'assets:vectors'],
        prod: ['assets:images', 'assets:fonts', 'assets:misc', 'assets:vectors'],
    };
    return settings.digest(tasks, mode, 'dev');
};