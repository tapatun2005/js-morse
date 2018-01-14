const gulp = require('gulp'),
	gcmq = require('gulp-group-css-media-queries'),
	sass = require('gulp-sass'),
	pug = require('gulp-pug'),
	autoprefixer = require('gulp-autoprefixer'),
	cssnano = require('gulp-cssnano'),
	imagemin = require('gulp-imagemin'),
	browserSync = require('browser-sync').create(),
	replace = require('gulp-replace'),
	environments = require('gulp-environments'),
	rename = require("gulp-rename"),
	uglify = require('gulp-uglify');
	plumber = require('gulp-plumber');
	babel = require('gulp-babel');

gulp.task('default', ['compile', 'server', 'watch', ]);
gulp.task('compile', ['templates','styles', "scripts", 'images', 'fonts']);

gulp.task('templates', () => {
	return gulp.src('./_source/templates/*.pug')
		.pipe(pug())
		.pipe(gulp.dest('./build/'));
});

gulp.task('styles', () => {
	return gulp.src('./_source/scss/*.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gcmq())
        .pipe(cssnano())
		.pipe(rename('styles.min.css'))
		.pipe(gulp.dest("./build/css/"));
});

gulp.task('scripts', () => {
	return gulp.src('./_source/js/*.js')
		.pipe(plumber())
		.pipe(babel({
            presets: ['env']
        }))
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('./build/js'));
});

gulp.task('images', () => {
	return gulp.src("./_source/images/**/*")
		.pipe(imagemin())
		.pipe(gulp.dest("./build/images/"));

});

gulp.task('fonts', () => {
	return gulp.src('_source/fonts/*')
		.pipe(gulp.dest('./build/fonts'));
});

gulp.task('watch', function(){
	gulp.watch('_source/scss/**/*.scss', ["styles"]);
	gulp.watch('_source/templates/*.pug', ["templates"]);
	gulp.watch('_source/images/*', ["images"]);
	gulp.watch('_source/js/*', ["scripts"]);
})

gulp.task('server', ['compile'], function () {
  return browserSync.init(['build/js/*.js', 'build/css/*.css', 'build/index.html', 'build/images/*'], {
    server: {
      baseDir: './build/'
    }
  });
});