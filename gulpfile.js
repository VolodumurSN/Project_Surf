const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const panini = require('panini');
const rigger = require('gulp-rigger');
const uglify = require('gulp-uglify');

gulp.task('serverBrowsersync', function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(rename({
                prefix: "",
                suffix: "-min",
              }))
              .pipe(autoprefixer({
                  Browserslist: ['last 8 versions'],
                  cascade: true
              }))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest("dist/css"))
            .pipe(gulp.dest("src/css"))
            .pipe(browserSync.stream());    
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel("styles"));
    gulp.watch("src/**/*.html").on('change', browserSync.reload);
    gulp.watch("src/js/*.js").on('change', browserSync.reload);
    gulp.watch("src/**/*.html").on('change', gulp.parallel('html'));
});

gulp.task('html', function () {
    panini.refresh();
    return gulp.src("src/*.html")
        .pipe(panini({
            root: 'src/',
            layouts: 'src/tpl/layouts/',
            partials: 'src/tpl/partials/'
        }))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest("dist/")); 
});

gulp.task('scripts', function () {
    return gulp.src("src/js/**/*.js")
        .pipe(rigger())
        .pipe(uglify())
        .pipe(gulp.dest("dist/js")); 
});

gulp.task('fonts', function () {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("dist/fonts")); 
});

gulp.task('icons', function () {
    return gulp.src("src/icons/**/*")
        .pipe(gulp.dest("dist/icons")); 
});

gulp.task('mailer', function () {
    return gulp.src("src/mailer/**/*")
        .pipe(gulp.dest("dist/mailer")); 
});

gulp.task('images', function () {
    return gulp.src("src/img/**/*")
        .pipe(imagemin()) 
        .pipe(gulp.dest("dist/img")); 
});

gulp.task('default', gulp.parallel('watch', 'serverBrowsersync', 'styles', 'html', 'scripts', 'fonts', 'icons', 'mailer', 'images'));
// gulp.task('default', gulp.parallel('watch', 'serverBrowsersync', 'styles', 'html'));

