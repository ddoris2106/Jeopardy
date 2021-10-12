// Initailize Modules
// const gulp = require("gulp");
const { src, dest, watch, series, task } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnono = require('cssnano');
// const babel = require('gulp-babel');
// const terser = require('gulp-terser');
// const webpack = require('webpack-stream');
const browsersync = require('browser-sync').create();

// Use dart-sass for @use
sass.compiler = require('dart-sass');

// Sass Task
function scssTask(){
    return src('css/scss/style.scss', { sourcemaps: true})
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnono()]))
        .pipe(dest('css', { sourcemaps: '.' }));
}

// Javascript Task
// function jsTask(){
//     return src('js/app/script.js', { sourcemaps: true})
//         .pipe(babel({ presets: ['@babel/preset-env'] }))
//         .pipe(terser())
//         .pipe(dest('js', { sourcemaps: '.' }));
// }


// Javascript Task
// task('webpack', () => {
//     return gulp.src('js/')
//     .pipe(webpack(require('./webpack.config.js')))
//     .pipe(gulp.dest('js/'));
// });

// gulp.task('default', function () {
  

// Browsersync
function browserSyncServe(cb){
    browsersync.init({
        server: {
            baseDir: '.',
        },
        notify: {
            styles: {
                top: 'auto',
                bottom: '0',
            },
        },
    });
    cb();
}
function browserSyncReload(cb) {
    browsersync.reload();
    cb();
}

// Watch Task
function watchTask() {
    watch('*.html', browserSyncReload);
    watch(
        ['css/scss/**/*.scss', 'js/app/**/*.js'],
        series(scssTask, browserSyncReload)
    );
}

// Default Gulp Task
exports.default = series(scssTask, browserSyncServe, watchTask);