'use strict';

const merge = require('lodash').merge;
const data = require('gulp-data');
const gulpif = require('gulp-if');
const plumber = require('gulp-plumber');
const frontMatter = require('front-matter');
const fs = require('fs');
const handlebars = require('gulp-compile-handlebars');
const path = require('path');
const rename = require('gulp-rename');

const defaults = {
  sharedData: {},
  dest: './dist',
  layoutDir: './src/layouts',
  name: 'html',
  plugins: {
    handlebars: {
      ignorePartials: true,
      batch: ['./src/partials']
    }
  },
  src: './src/*.hbs',
  templateExt: 'hbs',
  plumb: true
};

/* Helper to extract meta data embedded in the file contents. */
function parseContent(file) {
  return frontMatter(String(file.contents));
}

module.exports = function(gulp, options) {
  const opts = merge({}, defaults, options);
  const sharedData = opts.sharedData;
  const dest = opts.dest;
  const layoutDir = opts.layoutDir;
  const name = opts.name;
  const plugins = opts.plugins;
  const src = opts.src;
  const templateExt = opts.templateExt;
  const plumb = opts.plumb;
  // Object destructuring is being difficult right now
  // var { sharedData, dest, layoutDir, plugins, src, templateExt } = opts;

  /* Helper to resolve template paths. */
  function getLayoutPath(name) {
    return path.resolve(
      process.cwd(),
      `${layoutDir}/`,
      `${name}.${templateExt}`
    );
  }

  gulp.task(name, function() {
    /* Helper to abstract handlebars sub-task. */
    const compileHtml = function() {
      return handlebars(sharedData, plugins.handlebars);
    };

    /* Helper to abstract FrontMatter sub-task. */
    const parseData = function(file) {
      const content = parseContent(file);
      file.contents = Buffer.from(content.body);
      return content.attributes;
    };

    /* Helper to abstract template replacement sub-task. */
    const wrapHtml = function(file, name) {
      const html = String(file.contents);
      const path = getLayoutPath(name);

      file.contents = fs.readFileSync(path);
      return { content: html };
    };

    return gulp
      .src(src)
      .pipe(gulpif(plumb, plumber()))
      .pipe(data(file => parseData(file)))
      .pipe(compileHtml())
      .pipe(data(file => wrapHtml(file, file.data.layout)))
      .pipe(compileHtml())
      .pipe(rename(path => (path.extname = '.html')))
      .pipe(gulp.dest(dest));
  });
};
