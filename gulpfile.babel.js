import gulp from 'gulp'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import gutil from 'gulp-util'
import imagemin from 'gulp-imagemin'
import imageresize from 'gulp-image-resize'
import gm from 'gulp-gm'
import responsive from 'gulp-responsive-images'
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

gulp.task('views', () => {
  gulp.src(FILES.views)
    .pipe(hb({
      data: './app/data/**/*.js',
      helpers: './app/js/helpers/*.js',
      partials: './app/templates/partials/**/*.hbs',
      bustCache: true,
      debug: false
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

// gulp.task('resize', () => {
//   gulp.src(PATHS.app + '/img/projects/*.jpg')
//     .pipe(imageresize({ width: 1400, upscale: false }))
//     .pipe(gulp.dest(PATHS.build + '/assets/img/projects'))
// })

gulp.task('resize', () => {
  const maxWidth = 800
  gulp.src(PATHS.app + '/img/projects/*.png')
    .pipe(gm(file => {
      return file.fill('white').flatten().opaque('none').setFormat('jpg')
    }, { imageMagick: true }))
    .pipe(responsive({
      '*': [{
        width: maxWidth,
        suffix: ''
      }, {
        width: maxWidth * 2,
        suffix: '-2x'
      }]
    }))
    .pipe(gulp.dest(PATHS.build + '/assets/img/projects'))
})
// .pipe(imageresize({ width: 1400, upscale: false }))

// gulp.src(PATHS.app + '/img/projects/*.png')
//   .pipe(gm(file => file.setFormat('jpg')))
//   // .pipe(gm(file => file.fill('white').opaque('none').format('jpg')))
//   // .pipe(imageresize({ width: 1400, upscale: false }))
//   .pipe(gulp.dest(PATHS.build + '/assets/img/projects'))

//  images --> minify + cache --> dist
gulp.task('img', () => {
  gulp.src([FILES.img, '!app/img/projects/', '!app/img/projects/**'])
    .pipe(cache(imagemin({ interlaced: true })))
    .pipe(gulp.dest(PATHS.build + '/assets/img'))
    .pipe(reload({ stream: true }))
})

//  sass --> css --> dist
gulp.task('sass', () => {
  const plugins = [ mqpacker() ]
  gulp.src(FILES.sass)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(base64({ baseDir: './app/img', debug: false }))
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

gulp.task('default', ['static', 'img', 'sass', 'js', 'browser-sync', 'views', 'resize'], () => {
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
