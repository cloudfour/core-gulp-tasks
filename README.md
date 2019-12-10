# ⛔️ DEPRECATED

This project has been deprecated, because we no longer use it, and for similar
reasons as [gulp-util](https://medium.com/gulpjs/gulp-util-ca3b1f9f9ac5).
You are welcome to fork the project, but for security reasons we are not looking
for a new owner or maintainer.

# Core Gulp Tasks

[![NPM version](https://img.shields.io/npm/v/@cloudfour/gulp-tasks.svg)](https://www.npmjs.com/package/@cloudfour/gulp-tasks) [![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

**Note:** Requires `node >=4.0.0`

## Usage

```
npm install --save-dev @cloudfour/gulp-tasks
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
