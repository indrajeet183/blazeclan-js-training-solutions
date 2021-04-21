const gulp = require('gulp')
const gulpconcat = require('gulp-concat')

function concat(){
        return gulp.src('./src/**/*.js') 
                .pipe(gulpconcat("build.js")) 
                .pipe(gulp.dest("./build")) 
}

exports.concat = concat