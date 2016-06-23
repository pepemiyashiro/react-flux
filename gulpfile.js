"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');

var config = {
  port: 9005,
  devBaseUrl: 'http://localhost',
  path: {
    html: './src/*.html',
    dist: './dist'
  }
}

gulp.task('connect', function() {
  connect.server({
    root: ['dist'],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true
  });
});

gulp.task('open', ['connect'], function() {
  gulp.src('dist/index.html')
    .pipe(open({uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html', function() {
  gulp.src(config.path.html)
    .pipe(gulp.dest(config.path.dist))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(config.path.html, ['html']);
})

gulp.task('default', ['html', 'open', 'watch']);
