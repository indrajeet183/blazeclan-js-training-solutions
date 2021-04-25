const gulp = require('gulp')
const gulpconcat = require('gulp-concat')

function table() {
        return gulp.src('./src/table/**/*.js')
                .pipe(gulpconcat("table.js"))
                .pipe(gulp.dest("./build"))
}

function form() {
        return gulp.src('./src/form/**/*.js')
                .pipe(gulpconcat("form.js"))
                .pipe(gulp.dest("./build"))
}

function string() {
        return gulp.src('./src/string/**/*.js')
                .pipe(gulpconcat("string.js"))
                .pipe(gulp.dest("./build"))
}

function checkbox() {
        return gulp.src('./src/checkbox/**/*.js')
                .pipe(gulpconcat("checkbox.js"))
                .pipe(gulp.dest("./build"))
}


gulp.task('table', table)
gulp.task('form', form)
gulp.task('string', string)
gulp.task('checkbox', checkbox)
gulp.task('default', gulp.series('table', 'form', 'string', 'checkbox'))