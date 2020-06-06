// Iitialize modules
const { src, dest, watch, series, parallel } = require('gulp');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano')
const concat = require('gulp-concat');
const replace = require('gulp-replace')
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();

// file patch variables
const files = {
    scssPath: "src/scss/*.scss",
    jsPath: "src/js/*.js",
    imgPath: "src/img/*"
}
const destFiles = {
    exportCss: 'build/assets/css',
    exportJs: 'build/assets/js',
    exportimg: 'build/assets/img',
};

// sass task
function scssTask() {
    return src(files.scssPath)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(destFiles.exportCss))
        .pipe(browserSync.stream());
}

// js task 
function jsTask() {
    return src(files.jsPath)
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(dest(destFiles.exportJs))
}

// replace
const cbString = new Date().getTime();
function cacheBurstTask() {
    return src(['*.html'])
        .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
        .pipe(dest('build/'))
        .pipe(browserSync.stream());
}

// Optimze image
function optImageTask() {
    return src(files.imgPath)
        .pipe(imagemin({
            interlaced: false,
            progressive: false,
            optimizationLevel: 5,
        }))
        .pipe(dest(destFiles.exportimg))
}


// watch
function watchTask() {
    browserSync.init({
        server: {
            baseDir: 'build/'
        }
    });
    watch(files.scssPath, scssTask)
    watch(files.jsPath, jsTask).on('change', browserSync.reload);
    watch(files.imgPath, optImageTask).on('change', browserSync.reload);
    watch('*.html').on('change', cacheBurstTask);
}
// Default task

exports.default = series(
    parallel(scssTask, jsTask, optImageTask),
    cacheBurstTask,
    watchTask
)