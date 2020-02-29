 const	gulp = require('gulp'),
 		rename = require('gulp-rename'),
 		sass = require('gulp-sass'),
 		sourcemaps = require('gulp-sourcemaps'),
 		plumber = require('gulp-plumber'),
 		browserSync = require('browser-sync');

 function css_style(done) {
 	gulp.src('scss/main.scss')
 	 .pipe(sourcemaps.init())
 	 .pipe(rename({
 	 	suffix: '.min',
 	 }))
 	 .pipe(sass({
 	 	errorLogToConsole: true,
 	 	outputStyle: 'compressed'
 	 }))
 	 .pipe(plumber())
 	 .pipe(sourcemaps.write('./'))
 	 .pipe(gulp.dest('./css/'))
 	 .pipe(browserSync.stream());

 	done();
}

function watchFiles() {
	gulp.watch('./scss/*.scss', css_style);
	gulp.watch('./js/*.js', browserReload);
	gulp.watch('./*.html', browserReload);
}

function sync(done) {
	browserSync.init({
		server: {
			baseDir: './'
		},
		port: 3000,
	});

	done();
}

function browserReload(done) {
	browserSync.reload();

	done();
}

gulp.task('default', gulp.parallel(watchFiles, sync));