const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

function cssStyle(done) {

	gulp.src('./scss/style.scss')
		.pipe(sass({
			errLogToConsole: true,
			outputStyle: 'compressed'
		}))
		.on('error', console.error.bind(console))
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 2 versions'],
			cascade: false
		}))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./css/'))
		.pipe(browserSync.stream());

	done();
}

function sync(done) {
	browserSync.init({
		server: {
			baseDir: './'
		},
		port: 7070
	});
	done();
}

function reload(done) {
	browserSync.reload();
	done();
}

function watcher() {
	gulp.watch('./scss/**/*', cssStyle);
	gulp.watch('./**/*.html', reload);
	gulp.watch('./**/*.js', reload);
}

gulp.task('default', gulp.parallel(watcher, sync));
