'use strict';

const merge = require('lodash').merge;
const { env } = require('gulp-util');
const rollup = require('gulp-better-rollup');
const sourcemaps = require('gulp-sourcemaps');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const { terser } = require('rollup-plugin-terser');
const { join } = require('path');
const gulpif = require('gulp-if');

const defaults = {
  name: 'js',
  entry: './src/assets/*/scripts/*.js'
};

module.exports = function(gulp, options) {
  const { name, entry } = merge({}, defaults, options);

  gulp.task(name, done =>
    gulp
      .src(entry)
      .pipe(gulpif(env.dev, sourcemaps.init()))
      .pipe(
        rollup(
          {
            plugins: [
              // Allow modules from node_modules
              nodeResolve(),
              // Allow modules with require()/module.exports
              commonjs(),
              // Transpile modules
              babel()
            ].concat(
              env.dev ? [] : terser() // Minify in production
            )
          },
          'iife'
        )
      )
      .pipe(gulpif(env.dev, sourcemaps.write('')))
      .pipe(gulp.dest(join('dist', 'assets')))
  );
};
