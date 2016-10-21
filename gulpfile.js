const gulp = require('gulp')
const stylus = require('gulp-stylus')
const autoprefixer = require('gulp-autoprefixer')
const pug = require('gulp-pug')
const imagemin = require('gulp-imagemin')
const cache = require('gulp-cache')
const browserSync = require('browser-sync').create()
const nodemon = require('gulp-nodemon')

// stylus: compile .styl --> .css
gulp.task('stylus', function() {
  return gulp.src('app/css/**/*.styl')
    .pipe(stylus())
    .pipe(autoprefixer())
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({ stream: true }))
})

// pug: compile .pug --> .html
// gulp.task('pug', function() {
//   return gulp.src('app/*.pug')
//     .pipe(pug())
//     .pipe(gulp.dest('build'))
//     .pipe(browserSync.reload({ stream: true }))
// })

// imagemin: minify images + cache them
gulp.task('imagemin', function() {
  return gulp.src('app/img/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin({ interlaced: true })))
    .pipe(gulp.dest('build/img'))
})

// browser-sync: local server
gulp.task('browser-sync', function() {
  browserSync.init({
    server: { baseDir: 'build' }
  })
})

// // browser-sync: node server
// gulp.task('browser-sync', ['nodemon'], function() {
//   browserSync.init(null, {
//     proxy: "http://localhost:9000",
//     files: ["build/**/*.*"],
//     port: 3000
//   })
// })

// // nodemon: monitor any changes in node
// gulp.task('nodemon', function(cb) {
//   let called = false
//   return nodemon({
//     script: 'app.js'
//   }).on('start', function() {
//     if (!started) { cb() }
//     called = true
//   })
// })


gulp.task('default', ['browser-sync', 'stylus', 'imagemin'], function() {
  gulp.watch('app/css/**/*.styl', ['stylus'])
  // gulp.watch('app/*.pug', ['pug'])
  gulp.watch('app/img/**/*.+(png|jpg|gif|svg)', ['imagemin'])
  gulp.watch('app/js/**/*.js', browserSync.reload)
  gulp.watch('build/*.html', browserSync.reload)
})
