'use strict';

const merge = require('lodash').merge;
const gutil = require('gulp-util');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');


const defaults = {
  name: 'js',
  optimize: false,
  plugins: {
    webpack: {
      entryGlobs: [
        './src/main.js'
      ],
      output: {
        path: './dist',
        filename: '[name].js'
      },
      plugins: []
    },
    productionWebpack: {
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin()
      ]
    }
  },
  logStatsOptions: {
    assets: true,
    chunks: false,
    chunkModules: false,
    colors: true,
    hash: false,
    timings: false,
    version: false,
    modules: false
  }
};

const handleWebpackErrors = (err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error(info.errors);
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }
};

const handleWebpackStats = (stats, logOptions) => {
  gutil.log(gutil.colors.bold('webpack:'), '\n\n', stats.toString(logOptions), '\n');
};

const generateEntryObj = (entryGlobs) => {
  return entryGlobs.reduce((obj, glob) => {
    return Object.assign(obj, {})
  });
};

// adds javascript build tasks 
module.exports = (gulp, options) => {
  const opts = merge({}, defaults, options);
  const {
    webpack: webpackConfig,
    productionWebpack: webpackProductionConfig
  } = opts.plugins

  // If entry is defined as globs,
  // transform globs into a list of
  if (settings.entryGlobs) {
    settings.entry = merge(
      generateEntryObj(settings.entryGlobs);
    delete settings.entryGlobs
  }

  // create a compiler for normal build & dev task
  const compiler = webpack(webpackMerge(
    defaults.plugins.webpack,
    opts.plugins.webpack
  ))

  // create a webpack compiler for production use
  const productionCompiler = webpack(webpackMerge(
    webpackConfig,
    defaults.plugins.productionWebpack,
    opts.plugins.productionWebpack,
  ));

  // non production static build task
  gulp.task(opts.name, (done) => {
    compile.run((err, stats) => {
      handleWebpackErrors(err, stats);
      handleWebpackStats(stats, opts.logStatsOptions);
      done();
    });
  });

  // production mode static build task
  gulp.task(`${opts.name}:prod`, (done) => {
    compile.run((err, stats) => {
      handleWebpackErrors(err, stats);
      handleWebpackStats(stats, opts.logStatsOptions);
      done();
    });
  });

  // watch mode task
  gulp.task(`${opts.name}:dev`, (done) => {
    compile.watch(handleWebpackErrors);
    done();
  });
};
