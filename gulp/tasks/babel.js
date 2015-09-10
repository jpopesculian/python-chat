var settings = require('../settings');

module.exports = function (gulp, plugins, mode) {
    tasks = {
        dev: function () {
            var file_exts = ['es6', 'jsx'];
            file_exts.forEach(function(file_ext) {
                gulp.src([settings.static_src + 'scripts/**/*.' + file_ext,
                    '!' + settings.static_src + 'scripts/jspm_packages',
                    '!' + settings.static_src + 'scripts/jspm_packages/**'],
                    {base: settings.static_src})
                    .pipe(plugins.changed(settings.static_dest))
                    .pipe(plugins.preprocess({context: settings.env.dev}))
                    .pipe(plugins.sourcemaps.init())
                    .pipe(plugins.babel())
                    .pipe(plugins.sourcemaps.write())
                    .pipe(gulp.dest(settings.static_dest))
                    .pipe(plugins.livereload());
            });
        },
        prod: function () {
            var file_exts = ['es6', 'jsx'];
            file_exts.forEach(function(file_ext) {
                gulp.src(settings.static_src + 'scripts/**/*.' + file_ext,
                    {base: settings.static_src})
                    .pipe(plugins.preprocess({context: settings.env.prod}))
                    .pipe(plugins.babel())
                    .pipe(plugins.uglify())
                    .pipe(gulp.dest(settings.static_dest));
            });
        },
    };
    return settings.digest(tasks, mode, 'dev');
};
