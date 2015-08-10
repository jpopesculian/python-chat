var settings = require('../settings');

module.exports = function (gulp, plugins, mode) {
    tasks = {
        dev: ['sass:dev'],
        prod: ['sass:prod'],
    };
    return settings.digest(tasks, mode, 'dev');
};