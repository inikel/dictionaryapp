'use strict';

const gulp = require('gulp'),
      sass = require('gulp-sass'),
      pug = require('gulp-pug'),
      debug = require('gulp-debug'),
      del = require('del'),
      autoprefixer = require('gulp-autoprefixer'),
      browserSync = require('browser-sync').create();

gulp.task('pug', function () {
  return gulp.src('source/pug/*.pug')
      .pipe(pug())
      .pipe(debug({title: 'working on'}))
      .pipe(gulp.dest('build'))
});

gulp.task('sass', function () {
  return gulp.src('source/scss/*.scss')
      .pipe(sass())
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(debug({title: 'working on'}))
      .pipe(gulp.dest('build/css'))
});

gulp.task('js', function () {
  return gulp.src('source/js/**/*.js')
      .pipe(debug({title: 'working on'}))
      .pipe(gulp.dest('build/js/'))
});

gulp.task('img', function () {
  return gulp.src('source/img/**/*.*', {since: gulp.lastRun('img')})
      .pipe(debug({title: 'working on'}))
      .pipe(gulp.dest('build/img'))
});

// gulp.task('assets', function () {
//   return gulp.src('source/assets/**/**.*')
//       .pipe(gulp.dest('build/assets'))
// });

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: 'build'
    },
    notify: true
  })
});

gulp.task('watch', function () {
  gulp.watch('source/scss/**/*.*', gulp.series('sass'));
  gulp.watch('source/pug/**/*.*', gulp.series('pug'));
  gulp.watch('source/js/**/*.*', gulp.series('js'));

  gulp.watch('build/**/*.*').on('change', browserSync.reload);
});

gulp.task('clean', function () {
  return del('build');
});

// gulp.task('build', gulp.series('clean', gulp.parallel('pug', 'sass', 'js', 'img', 'assets')));
gulp.task('build', gulp.series('clean', gulp.parallel('pug', 'sass', 'js', 'img')));

gulp.task('serve', gulp.parallel('watch', 'browser-sync'));

gulp.task('dev', gulp.series('build', 'serve'));