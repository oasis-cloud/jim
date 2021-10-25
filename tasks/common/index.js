const { src, dest } = require('gulp')
const ignore = require('./ignore')
const wxml = require('./wxml')
const wxss = require('./wxss')
const scripts = require('./script')
const json = require('./json')
const images = require('./images')
const { outputDir, cwd } = require('./config')
const gulpSrcOptions = { allowEmpty: true, base: cwd, ignore }

function wxmlTask() {
  return src(['**/*.wxml'], gulpSrcOptions)
    .pipe(wxml.minify())
    .pipe(wxml.injectJimHelper())
    .pipe(dest(outputDir))
}

function jsonTask() {
  return src(['**/*.json'], gulpSrcOptions)
    .pipe(json.injectJimHelperPage())
    .pipe(dest(outputDir))
}

function scriptTask() {
  return src(['**/*.js'], gulpSrcOptions)
    .pipe(scripts.terserMinify())
    .pipe(scripts.injectProcessEnv())
    .pipe(dest(outputDir))
}

function wxssTask() {
  return src(['**/*.wxss'], gulpSrcOptions)
    .pipe(wxss.purify())
    .pipe(dest(outputDir))
}

function imageTask() {
  return src(['**/*.{png,jpg,jpeg,gif}'], gulpSrcOptions)
    .pipe(images.min())
    .pipe(dest(outputDir))
}

function copyRestFileTask() {
  const cpIgnore = {
    allowEmpty: true,
    base: cwd,
    ignore: [...ignore, '**/*.{js,wxml,json,wxss,jpg,jpeg,gif,png}', outputDir],
  }
  return src(['**/*.*'], cpIgnore).pipe(dest(outputDir))
}

module.exports = {
  gulpSrcOptions,
  wxmlTask,
  jsonTask,
  wxssTask,
  scriptTask,
  imageTask,
  copyRestFileTask,
}
