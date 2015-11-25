'use strict';

var gulp = require('gulp');
var tasks = require('../');

tasks.assets(gulp, {
  src: './fixtures/assets/*',
  dest: './dist'
});

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
});

tasks.js(gulp, {
  plugins: {
    webpack: {
      entry: './fixtures/input.js',
      output: {
        path: './dist',
        filename: 'main.js'
      }
    }
  }
});
