# Core Gulp Tasks

**Note:** Node 0.12 or higher is required.

**Note:** Gulp version 3.9 for both the CLI and local version are required. More info [can be found here](https://markgoodyear.com/2015/06/using-es6-with-gulp/).

## Usage

```
npm install --save-dev cloudfour/core-gulp-tasks.git
```

```js
/* gulpfile.js */

var gulp = require('gulp');
var tasks = require('core-gulp-tasks');

/**
 * Register the tasks you need to use.
 */

tasks.css(gulp, {
  // Task options
});

tasks.js(gulp, {
  // Task options
});

gulp.task('default', ['css', 'js']);
```

```
gulp --tasks

Tasks for gulpfile.js
├── css
├── js
└── default
```
