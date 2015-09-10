var settings = require('../settings');

module.exports = function (gulp, plugins, mode) {
    tasks = {
        listen: function() {
            plugins.livereload.listen();
        },
        assets: function () {
            gulp.watch(settings.static_src + 'images/**/*', ['assets:images']);
            gulp.watch(settings.static_src + 'fonts/**/*', ['assets:fonts']);
            gulp.watch(settings.static_src + 'vectors/**/*', ['assets:vectors']);
        },
        sass: function () {
            gulp.watch(settings.static_src + 'styles/**/*.scss', ['sass:dev']);
        },
        babel: function () {
            gulp.watch(settings.static_src + 'scripts/app/**/*.es6', ['babel:dev']);
            gulp.watch(settings.static_src + 'scripts/app/**/*.jsx', ['babel:dev']);
        },
        javascript: function () {
            gulp.watch(settings.static_src + 'scripts/app/**/*.js', ['javascript:dev']);
        },
        html: function () {
            gulp.watch(settings.static_src + '**/*.html', ['html:dev']);
        }
    };
    return settings.digest(tasks, mode, 'sass');
};
