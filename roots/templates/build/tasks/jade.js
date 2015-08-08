var jadeMarko = require('jade-markoa');

gulp.task('jade:marko', function() {
  // custom jade compilation to .marko
  gulp.src(['apps/**/*.jade'])
      // filename: 'base',
      .pipe(jadeMarko({basedir: 'apps'}))
      .pipe(gulp.dest('./apps'))
});

gulp.task('jade:watch', function() {
  // custom jade compilation to .marko
  gulp.watch(['apps/**/*.jade'])
      // filename: 'base',
      .pipe(jadeMarko({basedir: 'apps'}))
      .pipe(gulp.dest('./apps'))
});
