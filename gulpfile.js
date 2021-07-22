
const {src, dest, watch, parallel, series}  = require('gulp');
const scss         = require('gulp-sass');
const concat       = require('gulp-concat');
const browserSync  = require('browser-sync');             
const uglify       = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const fs = require('fs');
const fileInclude = require('gulp-file-include');


    const htmlfileInclude = ()=>{
        return src(['./app/index.html'])
        .pipe(fileInclude({
            prefix:'@@',
            basedir: '@file'
        }))
        .pipe(dest('./app'))
    }
 const fonts = ()=>{
     src('./app/fonts/**.ttf')
     .pipe(ttf2woff())
     .pipe(dest('./app/fonts/'))
    return  src('./app/fonts/**.ttf')
       .pipe(ttf2woff2())
       .pipe(dest('./app/fonts/'))
 };


function browsersync(){
    browserSync.init({
        server : {
            baseDir: 'app/'
        }
    });

}

function images(){
    return src('app/images/**/*')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(dest('dist/images'))
}

function scripts(){
    return src([
        'node_modules/jquery/dist/jquery.js',
        'app/js/main.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}



function styles() {
    return src('app/scss/style.scss')
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserlist: ['last 10 versions'],
            grid: true
        }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

function build(){
    return src ([
        'app/css/style.min.css',
        'app/fonts/**/*',
        'app/js/main.min.js',
        'app/*.html'
    ], {base:'app'})
    .pipe(dest('dist'))
}



function cleanDist(){
    return del('dist')
}





function watching() {
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/*.html']).on('change', browserSync.reload);
    watch(['app/js/**/*.js','!app/js/main.min.js'], scripts);
    watch(['app/fonts/**.ttf'], fonts);
}


    




exports.htmlfileInclude = htmlfileInclude;
exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.fonts = fonts;
exports.build = series(cleanDist, images, build);
exports.default = parallel( htmlfileInclude,fonts, styles, scripts, browsersync, watching);