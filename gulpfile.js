/*
 * @Author: sk
 * @Date:   2016-01-28 10:15:18
 * @Last Modified by:   sk
 * @Last Modified time: 2016-01-28 11:06:55
 */

'use strict';
/*
1.less编译合并 压缩，合并
2.js合并压缩混淆
3.img复制
4.html压缩
 */
//
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
//less压缩，合并--合并没有必要，一般预处理css都可以导包
gulp.task('style', function() {
  //这里执行style任务时自动执行
  gulp.src('src/styles/demo.less')
    .pipe(less())
    .pipe(cssnano())
    .pipe(gulp.dest('dist/styles'))
    .pipe(browserSync.reload({
      stream: true
    }));
});
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
//js合并压缩，混淆
gulp.task('script', function() {
  gulp.src('src/scripts/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest(
      'dist/scripts'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

//图片复制
gulp.task('image', function() {
  gulp.src('src/images/*.*')
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.reload({
      stream: true
    }));
});


var htmlmin = require('gulp-htmlmin');
gulp.task('html', function() {
  gulp.src('src/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }));
});


var browserSync = require('browser-sync');
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: ['dist']
    },
  }, function(err, bs) {
    console.log(bs.options.getIn(["urls", "local"]))
  });
  gulp.watch('src/styles/*.less', ['style']);
  gulp.watch('src/scripts/*.js', ['script']);
  gulp.watch('src/images/*.*', ['image']);
  gulp.watch('src/*.html', ['html']);

})
