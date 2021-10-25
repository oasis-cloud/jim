const { gulpSrcOptions } = require('../common')
const fsPromises = require('fs/promises')
const { outputPath, outputDir } = require('../common/config')

const {
  scriptTask,
  wxssTask,
  imageTask,
  copyRestFileTask,
} = require('../common')
const { src, dest } = require('gulp')
const wxml = require('../common/wxml')

function wxmlTask() {
  return src(['**/*.wxml'], gulpSrcOptions)
    .pipe(wxml.minify())
    .pipe(wxml.injectJimHelper())
    .pipe(dest(outputDir))
}

function jsonTask() {
  return src(['**/*.json'], gulpSrcOptions).pipe(dest(outputDir))
}

module.exports = {
  async run(opts) {
    await fsPromises.rm(outputPath, { recursive: true, force: true })
    wxmlTask()
    jsonTask()
    scriptTask()
    wxssTask()
    imageTask()
    copyRestFileTask()
  },
}
