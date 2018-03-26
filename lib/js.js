'use strict';

const merge = require('lodash').merge;
const gutil = require('gulp-util');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonPrefix = require('common-prefix');
const glob = require('glob');

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

    // production only webpack config
    productionWebpack: {
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin()
      ]
    },

    // dev/watch only webpack config
    devWebpack: { }
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

const getGlobedEntries = (entryGlobs) => {
  const common = commonPrefix(entryGlobs)

  return entryGlobs.reduce((obj, pattern) => {
    glob.sync(pattern).forEach((path) => {
      const shortPath = path.substr(common.length)
      obj[shortPath.substr(0, shortPath.length - 3)] = path;
    })

    return obj;
  }, {})
}

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

// adds javascript build tasks
module.exports = (gulp, options) => {
  const opts = merge({}, defaults, options);
  const {
    webpack: webpackConfig,
    productionWebpack: webpackProductionConfig,
    devWebpack: webpackDevConfig
  } = opts.plugins

  if (webpackConfig.entryGlobs) {
    webpackConfig.entry = merge(
      {},
      webpackConfig.entry,
      getGlobedEntries(webpackConfig.entryGlobs)
    )
    delete webpackConfig.entryGlobs;
  }

  // merge user and default webpack configs
  const buildConfig = webpackMerge(
    defaults.plugins.webpack,
    webpackConfig
  )

  // non production static build task
  gulp.task(opts.name, (done) => {
    webpack(buildConfig, (err, stats) => {
      handleWebpackErrors(err, stats);
      handleWebpackStats(stats, opts.logStatsOptions);
      done();
    });
  });

  // production mode static build task
  gulp.task(`${opts.name}:prod`, (done) => {
    const productionConfig = webpackMerge(
      buildConfig,
      defaults.plugins.productionWebpack,
      webpackProductionConfig
    );

    webpack(productionConfig, (err, stats) => {
      handleWebpackErrors(err, stats);
      handleWebpackStats(stats, opts.logStatsOptions);
      done();
    });
  });

  // watch mode task
  gulp.task(`${opts.name}:dev`, (done) => {
    const devConfig = webpackMerge(
      buildConfig,
      defaults.plugins.devWebpack,
      webpackDevConfig
    );

    webpack(devConfig).watch({}, (err, stats) => {
      handleWebpackErrors(err, stats);
      handleWebpackStats(stats, opts.logStatsOptions);
    })
  });
};
