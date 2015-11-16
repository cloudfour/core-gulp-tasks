var merge = require('lodash').merge;
var data = require('gulp-data');
var frontMatter = require('front-matter');
var fs = require('fs');
var handlebars = require('gulp-compile-handlebars');
var path = require('path');
var rename = require('gulp-rename');

var defaults = {
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

module.exports = function (gulp, options) {
  var opts = merge({}, defaults, options);
  var sharedData = opts.sharedData;
  var dest = opts.dest;
  var layoutDir = opts.layoutDir;
  var plugins = opts.plugins;
  var src = opts.src;
  var templateExt = opts.templateExt;

  /* Helper to extract meta data embedded in the file contents. */
  function parseContent (file) {
    return frontMatter(String(file.contents));
  }

  /* Helper to resolve template paths. */
  function getLayoutPath (name) {
    return path.resolve(
      process.cwd(),
      layoutDir + '/',
      name + '.' + templateExt
    );
  }

  gulp.task('html', function () {
    /* Helper to abstract handlebars sub-task. */
    var compileHtml = function () {
      return handlebars(sharedData, plugins.handlebars)
    };

    /* Helper to abstract FrontMatter sub-task. */
    var parseData = function (file) {
      var content = parseContent(file);
      file.contents = new Buffer(content.body);
      return content.attributes;
    };

    /* Helper to abstract template replacement sub-task. */
    var wrapHtml = function (file, name) {
      var html = String(file.contents);
      var path = getLayoutPath(name);

      file.contents = fs.readFileSync(path);
      return { content: html };
    }

    return gulp.src(src)
      .pipe(data(function (file) {
        return parseData(file);
      }))
      .pipe(compileHtml())
      .pipe(data(function (file) {
        var layoutName = file.data.layout;
        return wrapHtml(file, layoutName);
      }))
      .pipe(compileHtml())
      .pipe(rename(function (path) {
        path.extname = '.html'
      }))
      .pipe(gulp.dest(dest));
  });
};
