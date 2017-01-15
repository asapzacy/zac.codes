import gulp from 'gulp'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import gutil from 'gulp-util'
import imagemin from 'gulp-imagemin'
import cache from 'gulp-cache'
import sass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import autoprefixer from 'gulp-autoprefixer'
import uglifycss from 'gulp-uglifycss'
import browserify from 'browserify'
import babelify from 'babelify'
import watchify from 'watchify'
import notify from 'gulp-notify'
import uglify from 'gulp-uglify'
import rename from 'gulp-rename'
import browserSync from 'browser-sync'

const PATHS = {
  app: 'app',
  build: 'dist'
}
const FILES = {
  ico: 'app/*.ico',
  html: 'app/**/*.html',
  img: 'app/img/**/*.+(png|jpg|svg)',
  sass: 'app/sass/**/*.scss',
  js: 'app/js/**/*.js',
  main: 'main.js'
}
const reload = browserSync.reload

//  static files --> dist
gulp.task('static', function() {
  gulp.src(FILES.ico)
    .pipe(gulp.dest('dist'))
  gulp.src(FILES.html)
    .pipe(gulp.dest('dist'))
    .pipe(reload({ stream: true }))
})

//  images --> minify + cache --> dist
gulp.task('img', function() {
  gulp.src(FILES.img)
    .pipe(cache(imagemin({ interlaced: true })))
    .pipe(gulp.dest(PATHS.build + '/img'))
    .pipe(reload({ stream: true }))
})

//  sass --> css --> dist
gulp.task('sass', function() {
  gulp.src(FILES.sass)
    .pipe(sass())
    .on('error', handleErrors)
    .pipe(rename('styles.css'))
    .pipe(gulp.dest(PATHS.build + '/css'))
    .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(uglifycss())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest(PATHS.build + '/css'))
    .pipe(reload({ stream: true }))
})

//  es6 --> js --> dist
gulp.task('js', function() {
  return build(FILES.main, false)
})

//  browser-sync --> local server
gulp.task('browser-sync', function() {
  browserSync.init({
    server: { baseDir: 'dist' },
    ghostMode: true,
    notify: false,
    open: false
  })
})

gulp.task('default', ['static', 'img', 'sass', 'js', 'browser-sync'], function() {
  gulp.watch(FILES.html, ['static'])
  gulp.watch(FILES.img, ['img'])
  gulp.watch(FILES.sass, ['sass'])
  return build(FILES.main, true)
})



function handleErrors(...args) {
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args)
  this.emit('end')
}

function build(file, watch) {
  const options = {
    entries: [ PATHS.app + '/js/' + file ],
    transform: [ babelify ],
    debug: true
  }
  let bundler = watch ? watchify(browserify(options)) : browserify(options)
  function rebundle() {
    const stream = bundler.bundle()
    return stream
      .on('error', handleErrors)
      .pipe(source(file))
      .pipe(buffer())
      .pipe(rename('main.js'))
      .pipe(gulp.dest(PATHS.build + '/js'))
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(rename('main.min.js'))
      .pipe(gulp.dest(PATHS.build + '/js'))
      .pipe(reload({ stream: true }))
  }
  bundler.on('update', function() {
    rebundle()
    gutil.log('rebundling..')
  })
  return rebundle()
}
