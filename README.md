# Description

<p>This Gulp template is designed to automate the build process of a web project. It includes various tasks for both development and final project build.</p>

I used the [starter template](https://github.com/YauhenKavalchuk/Starting_template 'click') by Yauhen Kavalchuk as the basis. I rewrote the code in ECMAScript, replacing `gulp.task()` with functions, made some changes to the code structure for better readability and maintainability, and added two modes: development and production build.

## Project launch

```
npm install - install dependencies
gulp dev - starts gulp in development mode
gulp prod - builds the final project
```

---

## Main Dependencies:

- `browser-sync` — a local server with support for automatic page reloads upon file changes
- `gulp-autoprefixer `— adds browser prefixes
- `gulp-clean `— removes files and directories
- `gulp-clean-css` — minifies CSS files
- `gulp-htmlmin` — minifies HTML files
- `gulp-if` — conditionally runs tasks
- `gulp-imagemin` — optimizes images
- `gulp-sass` — compiles Sass into CSS
- `gulp-terser` — minifies JavaScript files
- `gulp-useref` — parses build blocks in HTML and merges/minifies - resources
- `gulp.spritesmith` — generates sprites from images

---

## Task Descriptions:

- `serve` — launches a local development server with live-reloading
- `watcher` — watches changes in HTML, Sass, and JavaScript files, automatically running the respective tasks
- `html` — copies HTML files to the dist directory
- `compileSass` — compiles Sass, adds prefixes, and copies CSS to src/css
- `scripts` — refreshes the browser when JS files are changed
- `sprite` — creates image sprites
- `images` — optimizes images and copies them to the dist/img directory
- `fonts` — copies font files to the dist/fonts directory
- `libs` — copies third-party libraries to dist/libs
- `extras` — copies all root files except HTML to dist
- `cleanDist` — cleans the dist directory
- `build` — builds the project: minifies CSS, JavaScript, and - HTML, and combines resources
