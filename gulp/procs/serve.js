var settings = require('../settings');
var runSequence = require('run-sequence');

module.exports = function (gulp, plugins, mode) {
    tasks = {
        dev: function () {
            runSequence('clean:web', [ 'copy:dev', 'styles:dev', 'scripts:dev', 'html:dev',], 'update:dev');
        },
        prod: function () {
            runSequence('clean:web', [ 'copy:prod', 'styles:prod', 'scripts:prod', 'html:prod',]);
        },
    };
    return settings.digest(tasks, mode, 'dev');
};