'use strict';

const gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  imagemin = require('gulp-imagemin'),
  cssmin = require('gulp-cssmin'),
  rename = require('gulp-rename');


sass.compiler = require('node-sass');

const path = {
  'style': [
    './htdocs/src/sass/*.scss'
  ],
  'img': [
    './htdocs/src/img/*',
  ]
}

gulp.task('sass', function () {
  return gulp.src(path.style)
    .pipe(sass.sync({
      includePaths: require('node-normalize-scss').includePaths,
    }).on('error', sass.logError))
    .pipe(autoprefixer({
        cascade: false,
        overrideBrowserslist: [
          "last 2 versions",
          ">1%",
          "ie >= 11"
        ]
    }))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./htdocs/dist/css'));
});

gulp.task('imagemin', function () {
  return gulp.src(path.img)
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        // imagemin.svgo({
        //     plugins: [
        //         {removeViewBox: true},
        //         {cleanupIDs: false}
        //     ]
        // })
    ],
    {
      verbose: true
  }))
  .pipe(gulp.dest('./htdocs/dist/img/'))
});


gulp.task('watch', function () {
  gulp.watch(path.style, gulp.series(['sass'], ['imagemin']));
});
