const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');
const sass = require('gulp-sass')(require('sass'));
const liveserver = require('live-server')

const paths = {
    javascript:'src/*.js',
    css:'src/sass/**/main.scss',
    assets:'assets/*.*',
    dest:'dist'
}

const params = {
    port: 8181, // Set the server port. Defaults to 8080.
    host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
    root: "dist", // Set root directory that's being served. Defaults to cwd.
    open: true, // When false, it won't load your browser by default.
    file: "index.html", // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
    wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
    logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
};

function server(){
    return liveserver.start(params);
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

const build = gulp.series(cleanDist, css, javascript, assets)


exports.serve = server
exports.watch = gulp.series(watch, build)
exports.clean = cleanDist
exports.build = build
exports.default = build
