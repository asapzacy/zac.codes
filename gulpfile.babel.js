import gulp from 'gulp'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import gutil from 'gulp-util'
import imagemin from 'gulp-imagemin'
import cache from 'gulp-cache'
import hb from 'gulp-hb'
import sass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import postcss from 'gulp-postcss'
import base64 from 'gulp-base64'
// import autoprefixer from 'autoprefixer'
import uglifycss from 'gulp-uglifycss'
import mqpacker from 'css-mqpacker'
import browserify from 'browserify'
import babelify from 'babelify'
import watchify from 'watchify'
import notify from 'gulp-notify'
import uglify from 'gulp-uglify'
import rename from 'gulp-rename'
import browsersync from 'browser-sync'

const reload = browsersync.reload

const PATHS = {
  app: 'app',
  build: 'dist'
}

const FILES = {
  static: './app/**/*.+(ico|pdf)',
  fonts: './app/fonts/*',
  views: './app/templates/views/*.hbs',
  hbs: './app/templates/**/*.hbs',
  data: './app/data/*.js',
  img: './app/img/**/*.+(png|jpg|svg)',
  icons: './app/img/icons/*.svg',
  sass: './app/sass/**/*.scss',
  js: './app/js/**/*.js',
  main: 'main.js'
}

//  static files --> dist
gulp.task('static', () => {
  gulp.src(FILES.static)
    .pipe(gulp.dest(PATHS.build))
  gulp.src(FILES.fonts)
    .pipe(gulp.dest(PATHS.build + '/assets/fonts'))
    .pipe(reload({ stream: true }))
})

gulp.task('fonts', () => {
  gulp.src(FILES.fonts)
    .pipe(gulp.dest(PATHS.build + '/assets/fonts'))
    .pipe(reload({ stream: true }))
})

gulp.task('views', () => {
  gulp.src(FILES.views)
    .pipe(hb({
      data: './app/data/**/*.js',
      helpers: './app/js/helpers/*.js',
      partials: './app/templates/partials/**/*.hbs',
      bustCache: true,
      debug: true
    }))
    .pipe(rename(path => {
      gutil.log(path)
      path.dirname = path.basename !== 'landing' ? path.basename : path.dirname
      path.basename = 'index'
      path.extname = '.html'
    }))
    .pipe(gulp.dest('dist'))
    .pipe(reload({ stream: true }))
})

//  images --> minify + cache --> dist
gulp.task('img', () => {
  gulp.src(FILES.img)
    .pipe(cache(imagemin({ interlaced: true })))
    .pipe(gulp.dest(PATHS.build + '/assets/img'))
    .pipe(reload({ stream: true }))
})

//  sass --> css --> dist
gulp.task('sass', () => {
  const plugins = [
    // autoprefixer(),
    mqpacker()
  ]
  gulp.src(FILES.sass)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(base64({
      baseDir: './app/img',
      debug: true
    }))
    .pipe(postcss(plugins))
    .on('error', handleErrors)
    .pipe(rename('styles.css'))
    .pipe(gulp.dest(PATHS.build + '/assets/css'))
    .pipe(uglifycss())
    .pipe(rename('styles.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(PATHS.build + '/assets/css'))
    .pipe(reload({ stream: true }))
})

//  es6 --> js --> dist
gulp.task('js', () => {
  return build(FILES.main, false)
})

//  browser-sync --> local server
gulp.task('browser-sync', () => {
  browsersync.init({
    server: { baseDir: 'dist' },
    ghostMode: true,
    notify: false,
    open: false
  })
})

// gulp.task('build', () => {
//   gulp.src('./dist/assets/js/main.js')
//     .pipe(hash())
//     .pipe(gulp.dest(PATHS.build + '/assets/js'))
//     .pipe(hash.manifest('assets.json', {
//       deleteOld: true,
//       sourceDir: PATHS.build + '/assets/js'
//     }))
//     .pipe(gulp.dest(PATHS.build))
//   gulp.src('./dist/assets/css/styles.css')
//     .pipe(hash())
//     .pipe(gulp.dest(PATHS.build + '/assets/css'))
//     .pipe(hash.manifest('assets.json', {
//       deleteOld: true,
//       sourceDir: PATHS.build + '/assets/css'
//     }))
//     .pipe(gulp.dest(PATHS.build))
// })

gulp.task('default', ['static', 'img', 'sass', 'js', 'browser-sync', 'views'], () => {
  gulp.watch(FILES.static, ['static'])
  gulp.watch(FILES.img, ['img'])
  gulp.watch(FILES.sass, ['sass'])
  gulp.watch([FILES.data, FILES.hbs], ['views'])
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
      .pipe(gulp.dest(PATHS.build + '/assets/js'))
      .pipe(uglify())
      .pipe(rename('main.min.js'))
      .pipe(gulp.dest(PATHS.build + '/assets/js'))
      .pipe(reload({ stream: true }))
  }
  bundler.on('update', function() {
    rebundle()
    gutil.log('rebundling..')
  })
  return rebundle()
}
