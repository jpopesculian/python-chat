var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

/**
 *
 * LISTS OF TASKS & PROCS
 *
 */

var tasks = {
    'assets': ['images', 'fonts', 'misc', 'vectors'],
    'babel': ['dev', 'prod'],
    'clean': ['web'],
    'html': ['dev', 'prod'],
    'javascript': ['dev', 'prod'],
    'sass': ['dev', 'prod'],
    'watch': ['listen', 'sass', 'javascript', 'babel', 'html', 'assets']
};

load(tasks, "task");

var procs = {
    'copy': ['dev', 'prod'],
    'scripts': ['dev', 'prod'],
    'serve': ['dev', 'prod'],
    'styles': ['dev', 'prod'],
    'update': ['dev']
};

load(procs, "proc");

gulp.task('default', ['serve']);

/**
 *
 * LOADING FUNCTIONS
 *
 */

function get(file, fileType, mode) {
    return require('./gulp/' + fileType + 's/' + file)(gulp, plugins, mode);
}

function add(file, fileType, modes) {
    if (modes.constructor === Array) {
        for (var i=0; i < modes.length; i++) {
            mode = modes[i];
            gulp.task(file + ':' + mode, get(file, fileType, mode));
        }
    }
    gulp.task(file, get(file, fileType, false));
}

function load(files, fileType) {
    for (var file in files) {
        modes = files[file];
        add(file, fileType, modes);
    }
}
