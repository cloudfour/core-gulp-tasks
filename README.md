# Core Gulp Tasks

**Note:** Requires `node >=4.0.0`

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
