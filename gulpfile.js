var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');


gulp.task("css", () =>{
    gulp.src('src/**/*.scss')
    .pipe(sass())
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./src/styles'))
})

gulp.task('watch', () => {
    gulp.watch('src/**/*.scss',['css'])
})

gulp.task('default', ['css', 'watch'])