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

tasks.html(gulp, {
  dest: './dist',
  layoutDir: './fixtures',
  plugins: {
    handlebars: {
      batch: ['./fixtures'],
    }
  },
  src: './fixtures/input.hbs'
})
