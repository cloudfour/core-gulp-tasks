'use strict';

var gulp = require('gulp');
var tasks = require('../');

tasks.clean(gulp, {
  dest: './dist/temp'
});

tasks.css(gulp, {
  src: './fixtures/input.css',
  dest: './dist'
});
