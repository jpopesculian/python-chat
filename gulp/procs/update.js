var settings = require('../settings');

module.exports = function (gulp, plugins, mode) {
    tasks = {
        dev: ['watch:listen', 'watch:sass', 'watch:babel', 'watch:javascript', 'watch:html', 'watch:assets'],
    };
    return settings.digest(tasks, mode, 'dev');
};