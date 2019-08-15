const gulp = require('gulp');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();

gulp.task('static', function () {
    return gulp.src(['./src/static/**/*.*'])
        .pipe(gulp.dest('./dest/static'));
});

gulp.task('pug', function () {
    return gulp.src(['./src/**/*.pug', '!./src/include/**/*.*', '!./src/**/_*.*'])
        .pipe(pug())
        .pipe(gulp.dest('./dest/'));
});

gulp.task('build', gulp.series('pug', 'static'));

gulp.task('watch', gulp.series('build', function () {
    browserSync.init({
        server: {
            baseDir: "dest",
            index: "index.html"
        }
    });

    gulp.watch("src/**/*.pug").on('change', gulp.series('build', 'reload'));
}));

gulp.task('reload', function (done) {
    browserSync.reload();
});
