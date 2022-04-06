const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');

const paths = {
    javascript:'src/*.js',
    assets:'assets/*.*',
    dest:'dist'
}

function cleanDest(){
    return gulp.src(paths.dest+"/*", {read: false})
        .pipe(clean());
}

function javascript() {
    return gulp.src(paths.javascript)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.dest));
}

function assets(){
    return gulp.src(paths.assets)
    .pipe(gulp.dest(paths.dest))
}

function watch(){
    gulp.watch([paths.javascript, paths.assets], gulp.series(javascript, assets))
}

exports.watch = watch
exports.build = gulp.series(cleanDest,javascript, assets)
exports.default = exports.build
