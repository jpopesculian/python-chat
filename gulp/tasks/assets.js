var settings = require('../settings');

module.exports = function (gulp, plugins, mode) {
    tasks = {
        images: function () {
            gulp.src(settings.static_src + 'images/**/*',
                {base: settings.static_src})
                .pipe(plugins.changed(settings.static_dest))
                .pipe(gulp.dest(settings.static_dest))
                .pipe(plugins.livereload());
        },
        vectors: function () {
            gulp.src(settings.static_src + 'vectors/**/*',
                {base: settings.static_src})
                .pipe(plugins.changed(settings.static_dest))
                .pipe(gulp.dest(settings.static_dest))
                .pipe(plugins.livereload());
        },
        fonts: function () {
            gulp.src(settings.static_src + 'fonts/**/*',
                {base: settings.static_src})
                .pipe(plugins.changed(settings.static_dest))
                .pipe(gulp.dest(settings.static_dest))
                .pipe(plugins.livereload());
        },
        misc: function () {
            var file_exts = ['txt', 'ico', 'config', 'md'];
            file_exts.forEach(function(file_ext) {
                gulp.src(settings.static_src + '**/*.' + file_ext,
                    {base: settings.static_src})
                    .pipe(plugins.changed(settings.static_dest))
                    .pipe(gulp.dest(settings.static_dest))
                    .pipe(plugins.livereload());
            });
        }
    };
    return settings.digest(tasks, mode, 'img');
};
