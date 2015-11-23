'use strict';

let merge = require('lodash').merge;
let data = require('gulp-data');
let frontMatter = require('front-matter');
let fs = require('fs');
let handlebars = require('gulp-compile-handlebars');
let path = require('path');
let rename = require('gulp-rename');

let defaults = {
  sharedData: {},
  dest: './dist',
  layoutDir: './src/layouts',
  plugins: {
    handlebars: {
      ignorePartials: true,
      batch: ['./src/partials'],
    }
  },
  src: './src/*.hbs',
  templateExt: 'hbs'
};

module.exports = function(gulp, options) {
  let opts = merge({}, defaults, options);
  let { sharedData, dest, layoutDir, plugins, src, templateExt } = opts;

  /* Helper to extract meta data embedded in the file contents. */
  function parseContent (file) {
    return frontMatter(String(file.contents));
  }

  /* Helper to resolve template paths. */
  function getLayoutPath (name) {
    return path.resolve(
      process.cwd(),
      `${layoutDir}/`,
      `${name}.${templateExt}`
    );
  }

  gulp.task('html', function () {
    /* Helper to abstract handlebars sub-task. */
    let compileHtml = function () {
      return handlebars(sharedData, plugins.handlebars);
    };

    /* Helper to abstract FrontMatter sub-task. */
    let parseData = function (file) {
      let content = parseContent(file);
      file.contents = new Buffer(content.body);
      return content.attributes;
    };

    /* Helper to abstract template replacement sub-task. */
    let wrapHtml = function (file, name) {
      var html = String(file.contents);
      var path = getLayoutPath(name);

      file.contents = fs.readFileSync(path);
      return { content: html };
    }

    return gulp.src(src)
      .pipe(data((file) => parseData(file)))
      .pipe(compileHtml())
      .pipe(data((file) => wrapHtml(file, file.data.layout)))
      .pipe(compileHtml())
      .pipe(rename((path) => path.extname = '.html'))
      .pipe(gulp.dest(dest));
  });
};
