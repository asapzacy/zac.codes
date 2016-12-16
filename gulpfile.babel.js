import gulp from 'gulp'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import gutil from 'gulp-util'
import imagemin from 'gulp-imagemin'
import cache from 'gulp-cache'
import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import uglifycss from 'gulp-uglifycss'
import browserify from 'browserify'
import babelify from 'babelify'
import watchify from 'watchify'
import notify from 'gulp-notify'
import uglify from 'gulp-uglify'
import rename from 'gulp-rename'
import browserSync from 'browser-sync'

const reload = browserSync.reload
const PATHS = {
  app: 'app',
  build: 'dist'
}
const FILES = {
  ico: 'app/favicon',
  html: 'app/**/*.html',
  img: 'app/img/**/*.+(png|jpg|svg)',
  sass: 'app/sass/**/*.scss',
  js: 'app/js/**/*.js'
}

// static files --> dist
gulp.task('static', function() {
  gulp.src(FILES.ico)
    .pipe(gulp.dest('dist'))
  gulp.src(FILES.html)
    .pipe(gulp.dest('dist'))
    .pipe(reload({ stream: true }))
})

// images --> minify + cache --> dist
gulp.task('img', function() {
  gulp.src(FILES.img)
    .pipe(cache(imagemin({ interlaced: true })))
    .pipe(gulp.dest(PATHS.build + '/img'))
    .pipe(reload({ stream: true }))
})

// sass --> css --> dist
gulp.task('sass', function() {
  gulp.src(FILES.sass)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(uglifycss())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest(PATHS.build + '/css'))
    .pipe(reload({ stream: true }))
})

// es6 --> js --> dist
gulp.task('js', function() {
  return build('main.js', false)
})

function handleErrors() {
  var args = Array.prototype.slice.call(arguments)
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args)
  this.emit('end')   // keep gulp from hanging on this task
}

// function handleErrors() {
//   console.log('compile error')
//   return
// }
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
      .pipe(uglify())
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

// browser-sync --> local server
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
  return build('main.js', true)
})
