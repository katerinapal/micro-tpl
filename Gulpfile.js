import gulp from "gulp";
import jscs from "gulp-jscs";
import mocha from "gulp-mocha";

gulp.task('mocha', function () {
  return gulp.src('./test/*.js', { read: false })
    .pipe(mocha({ reporter: 'list' }));
})

gulp.task('default', ['mocha'], function () {
  return gulp.src(['index.js', './lib/**/*.js'])
    .pipe(jscs());
});