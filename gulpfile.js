/**
 * Created by Administrator on 2017-07-03.
 */

// 변수선언 = require('모듈이름');
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var include = require('gulp-include');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');

/*

 gulp.task( task이름, 함수/익명함수 );

 */

// pipe()는 모듈의 기능을 실행해주는 함수

// 새로 고침
gulp.task('livereload', function(){
  gulp.src(['html/*', 'css/*', 'js/*', '*'])
      .pipe( livereload() );
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('*', ['livereload']);
  gulp.watch('html_src/**', ['include', 'livereload']);
  gulp.watch('css_src/**', ['sass', 'livereload']);
  gulp.watch('js_src/**', ['jsconcat', 'livereload']);

});

// header, footer, 공통영역 분리
gulp.task('include', function(){
  gulp.src("html_src/*.html")
      .pipe(include())
      .on('error', console.log)
      .pipe(gulp.dest("html/"));
});

// sass 실행
gulp.task('sass', function(){
  return gulp.src('css_src/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('css/'));
});

// concat 실행 - 여러 개의 파일을 하나의 파일로 합치는 기능
gulp.task('gnb', function() {
  return gulp.src('js_src/*.js')
      .pipe(sourcemaps.init())
      .pipe(concat('gnb.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('js/'));
});

gulp.task('jsr_2_4_1', function() {
  return gulp.src('js_src/*.js')
      .pipe(sourcemaps.init())
      .pipe(concat('jsr_2_4_1.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('js/'));
});

gulp.task('jsconcat', ['gnb', 'jsr_2_4_1']);

gulp.task('default', ['livereload', 'include', 'sass', 'jsconcat', 'watch']);