# Core Gulp Tasks

[![NPM version](https://img.shields.io/npm/v/@cloudfour/gulp-tasks.svg)](https://www.npmjs.com/package/@cloudfour/gulp-tasks)  [![Renovate Status](https://badges.renovateapi.com/github/cloudfour/core-gulp-tasks)](https://renovatebot.com/)

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
