const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

/**
 * Minifies images
 * @task minifyImg
 */
gulp.task('minifyImg', () =>
  gulp
      .src('src/images/original/*')
      .pipe(imagemin([imagemin.optipng({optimizationLevel: 5})]))
      .pipe(gulp.dest('src/images/minified'))
);
