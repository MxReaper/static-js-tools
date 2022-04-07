const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');
const sass = require('gulp-sass')(require('sass'));

const paths = {
    javascript:'src/*.js',
    css:'src/sass/**/main.scss',
    assets:'assets/*.*',
    dest:'dist'
}

function cleanDist(){
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

function css() {
    return gulp.src(paths.css)
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(gulp.dest(paths.dest+"/css"));
  };

function assets(){
    return gulp.src(paths.assets)
    .pipe(gulp.dest(paths.dest))
}

function watch(){
    gulp.watch([paths.javascript, paths.assets], gulp.series(css, javascript, assets))
}

exports.watch = watch
exports.build = gulp.series(cleanDist, css, javascript, assets)
exports.default = exports.build
