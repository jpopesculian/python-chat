var settings = require('../settings');

module.exports = function (gulp, plugins, mode) {
    tasks = {
        dev: function () {
            gulp.src(settings.static_src + 'styles/**/*.scss',
                {base: settings.static_src})
                .pipe(plugins.changed(settings.static_dest))
                .pipe(plugins.sass({ outputStyle: 'expanded' }))
                .pipe(gulp.dest(settings.static_dest))
                .pipe(plugins.livereload());
        },
        prod: function () {
            gulp.src(settings.static_src + 'styles/**/*.scss',
                {base: settings.static_src})
                .pipe(plugins.sass({ outputStyle: 'compressed' }))
                .pipe(gulp.dest(settings.static_dest));
        },
    };
    return settings.digest(tasks, mode, 'dev');
};
