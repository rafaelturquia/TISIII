var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    cleanCSS    = require('gulp-clean-css'),
    concat      = require('gulp-concat'),
    concatCss   = require('gulp-concat-css'),
    minifycss   = require('gulp-minify-css'),
    jshint      = require('gulp-jshint'),
    jshintStyle = require('jshint-stylish'),
    plumber     = require('gulp-plumber'),
    rename      = require('gulp-rename'),
    sass        = require('gulp-compass'),
    sourcemaps  = require('gulp-sourcemaps'),
    notify      = require('gulp-notify'),
    uglify      = require('gulp-uglify'),
    fs          = require('fs'),
    htmlmin     = require('gulp-htmlmin');

gulp.task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });
});

gulp.task('sync', () => {
  browserSync.reload();
});

function customPlumber(errTitle) {
  return plumber({
    errorHandler: notify.onError({
          // Customizing error title
          title: errTitle || "Error running Gulp",
          message: "Error: <%= error.message %>",
          sound: "Glass"
        })
    });
}

gulp.task('sass', () =>{
    gulp.src(['assets/sass/**/*.scss'])
        .pipe(customPlumber('Pog no Sass'))
        .pipe(sass({
            project: __dirname,
            sourcemap: true,
            sass: './assets/sass',
            style: 'compressed'
        }))
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/css/'))
        .pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts', () =>{
    gulp.src('assets/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(customPlumber('Pog no Js'))
        .pipe(jshint())
        .pipe(jshint.reporter(jshintStyle))
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js/'))
        .pipe(browserSync.reload({stream:true}))
});

//Tarefa para unir todas as bibliotecas js
gulp.task('libsJS', () => {
    var plugins = JSON.parse(fs.readFileSync('./plugins-js.json'));
    for (var i = 0; plugins.length > i; i++) {
        gulp.src(plugins[i].arquivos)
            .pipe(concat('libs.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('./build/js'))
            .pipe(browserSync.reload({ stream: true }));
    }
});

gulp.task('libsCSS', () => {
    var plugins = JSON.parse(fs.readFileSync('./plugins-css.json'));
    for (var i = 0; plugins.length > i; i++) {
        gulp.src(plugins[i].arquivos)
            .pipe(concat('libs.min.css'))
            .pipe(minifycss())
            .pipe(gulp.dest('./build/css'))
            .pipe(browserSync.reload({ stream: true }));
    }
});

gulp.task('minify', () => {
    return gulp.src('./*.html')
        .pipe(customPlumber('Pog no HtmlMin'))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('build'));
  });

// Gulp task to minify HTML files
// gulp.task('pages', function() {
//     return gulp.src(['produtos/*.html'])
//       .pipe(htmlmin({
//         collapseWhitespace: true,
//         removeComments: true
//       }))
//       .pipe(gulp.dest('./build/produtos'));
//   });

// Task to minify HTML
gulp.task('minify-html', function() {
    return gulp.src('produtos/*.html')
    .pipe(htmlmin())
    .pipe(gulp.dest('build/produtos'));
    });
    
    gulp.task('watch', function (){
        gulp.watch('produtos/*.html', ['minify-html']);
    // other tasks
    });

gulp.task('default', ['server'], () =>{
    gulp.watch("assets/sass/**/*.scss", ['sass','sync']);
    gulp.watch("assets/js/**/*.js", ['scripts','sync']);
    gulp.watch("./*.html", ['minify','sync']);
    gulp.watch("./plugins-js.json", ['libsJS']);
    gulp.watch("./plugins-css.json", ['libsCSS']);
});
