var settings = require('../settings');
var del = require('del');

module.exports = function (gulp, plugins, mode) {
    tasks = {
        web: function () {
            del.sync([
                settings.static_dest + '**'
            ]);
        },
    };
    return settings.digest(tasks, mode, 'web');
};
