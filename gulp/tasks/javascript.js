var settings = require('../settings');

module.exports = function (gulp, plugins, mode) {
    tasks = {
        dev: function () {
            gulp.src(settings.static_src + 'scripts/**/*.js',
                {base: settings.static_src})
                .pipe(plugins.changed(settings.static_dest))
                .pipe(plugins.preprocess({context: settings.env.dev}))
                .pipe(gulp.dest(settings.static_dest))
                .pipe(plugins.livereload());
        },
        prod: function () {
            gulp.src(settings.static_src + 'scripts/**/*.js',
                {base: settings.static_src})
                .pipe(plugins.preprocess({context: settings.env.prod}))
                .pipe(plugins.uglify())
                .pipe(gulp.dest(settings.static_dest));
        },
    };
    return settings.digest(tasks, mode, 'dev');
};
