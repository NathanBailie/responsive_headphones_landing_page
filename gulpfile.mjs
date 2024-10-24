/* DEPENDENCIES */
import browserSync, { init, notify, stream } from 'browser-sync'; // inject code to all devices
import gulp from 'gulp'; // gulp core
import autoprefixer from 'gulp-autoprefixer'; // sets missing browser prefixes
import clean from 'gulp-clean'; // remove files and folders
import cleanCSS from 'gulp-clean-css'; // minify CSS files
import htmlmin from 'gulp-htmlmin'; // minify HTML files
import gulpif from 'gulp-if'; // conditionally run a task
import imagemin from 'gulp-imagemin'; // minify images
import dartSass from 'sass';
import gulpSass from 'gulp-sass'; // sass compiler
import terser from 'gulp-terser'; // minify JavaScript files
import useref from 'gulp-useref'; // parse build blocks in HTML files
import spritesmith from 'gulp.spritesmith'; // create sprites
import pngquant from 'imagemin-pngquant'; // minify png-format images

const { series, parallel, src, dest, watch } = gulp;
const sass = gulpSass(dartSass);

/* BROWSERSYNC (LOCAL SERVER) */
function serve() {
	browserSync.init({
		server: {
			baseDir: './src/',
		}, // base dir
		notify: false, // disable notification
		scrollRestoration: true, // save scroll position
	});
}

/* WATCHER (WATCHING FILE CHANGES)*/
function watcher() {
	watch('./src/**/*.html', html);
	watch('./src/sass/**/*.+(scss|sass|css)', compileSass);
	watch('./src/js/**/*.js', scripts);
	watch('./src/img/sprite/*.*', sprite);
}

/* HTML */
function html() {
	return src('./src/index.html') // get the files
		.pipe(dest('./dist/')) // where to put the file
		.pipe(browserSync.stream()); // browsersync stream
}

/* SASS */
function compileSass() {
	return src('./src/sass/**/*') // get the files
		.pipe(sass().on('error', sass.logError)) // add prefixes
		.pipe(
			autoprefixer({
				overrideBrowserslist: ['last 2 versions'],
				cascade: true,
			})
		)
		.pipe(dest('src/css')) // where to put the file
		.pipe(browserSync.stream()); // browsersync stream
}

/* JS */
function scripts() {
	return src('./src/js/**/*.js') // get the files
		.pipe(browserSync.stream()); // browsersync stream
}

/* IMAGES */
function sprite(done) {
	buildSprite().on('end', done);
}

function images() {
	return src('./src/img/**/*') // get the files
		.pipe(
			imagemin({
				// minify images
				progressive: true,
				svgoPlugins: [{ removeViewBox: false }, { cleanupIDs: false }],
				use: [
					pngquant({
						// minify png-format images
						quality: [0.5, 0.7],
						speed: 4,
					}),
				],
				interlaced: true,
			})
		)
		.pipe(dest('dist/img')); // where to put the files
}

/* FONTS */
function fonts() {
	return src('./src/fonts/**/*') // get the files
		.pipe(dest('dist/fonts')); // where to put the files
}

/* LIBS (PERSONAL DEVELOPER LIBS) */
function libs() {
	return src('./src/libs/**/*') // get the files
		.pipe(dest('dist/libs')); // where to put the files
}

/* EXTRAS (ROOT FILES, EXCEPT HTML) */
function extras() {
	return src(['src/*.*', '!src/*.html']) // get the files
		.pipe(dest('dist')); // where to put the files
}

/* CLEAN */
function cleanDist() {
	return src('dist', { read: false, allowEmpty: true }).pipe(clean()); // clean dir
}

function build() {
	const assets = useref();
	return src('src/*.html')
		.pipe(assets)
		.pipe(gulpif('*.js', terser())) // uglify js-files
		.pipe(gulpif('*.css', cleanCSS())) // minify css-files
		.pipe(htmlmin({ collapseWhitespace: true })) // minify html
		.pipe(useref())
		.pipe(dest('./dist')); // where to put the files
}

/* FUNCTIONS */
function buildSprite() {
	const spriteData = src('./src/img/sprite/*.*').pipe(
		spritesmith({
			imgName: '../img/sprite.png',
			cssName: '_sprite.scss',
			cssFormat: 'scss',
			padding: 5,
		})
	);

	spriteData.img.pipe(dest('./src/img'));
	return spriteData.css.pipe(dest('./src/sass/components'));
}

/* TASK EXPORTS */
export const dev = series(
	cleanDist,
	parallel(html, compileSass, scripts, images, fonts, libs, extras),
	parallel(serve, watcher)
);

export const prod = series(
	cleanDist,
	parallel(html, compileSass, scripts, images, fonts, libs, extras),
	build
);
