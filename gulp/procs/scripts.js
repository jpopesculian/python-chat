var settings = require('../settings');

module.exports = function (gulp, plugins, mode) {
    tasks = {
        dev: ['javascript:dev', 'babel:dev'],
        prod: ['javascript:prod', 'babel:prod'],
    };
    return settings.digest(tasks, mode, 'dev');
};
