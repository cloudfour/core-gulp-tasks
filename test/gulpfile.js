'use strict';

var gulp = require('gulp');
var tasks = require('..');

tasks.clean(gulp, {
  dest: './dist/temp'
});

tasks.copy(gulp, {
  src: './fixtures/static/*',
  dest: './dist'
});

tasks.css(gulp, {
  src: './fixtures/input.css',
  dest: './dist',
  prefix: 'prefix-',
  foftGroups: [
    {
      families: ['Roboto'],
      classNames: ['wf-loaded']
    }
  ]
});

tasks.html(gulp, {
  dest: './dist',
  layoutDir: './fixtures',
  plugins: {
    handlebars: {
      batch: ['./fixtures']
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
