const { src, dest, parallel } = require('gulp')
const ignore = require('../common/ignore')
const wxml = require('../common/wxml')
const wxss = require('../common/wxss')
const scripts = require('../common/script')
const json = require('../common/json')
const images = require('../common/images')
const fsPromises = require('fs/promises')
const { outputDir, outputPath, cwd } = require('../common/config')

const gulpSrcOptions = { allowEmpty: true, base: cwd, ignore }

const parallelTask = parallel(
  () => {
    src(['**/*.wxml'], gulpSrcOptions)
      .pipe(wxml.minify())
      .pipe(wxml.injectJimHelper())
      .pipe(dest(outputDir))
  },
  () => {
    src(['**/*.json'], gulpSrcOptions)
      .pipe(json.injectJimHelperPage())
      .pipe(dest(outputDir))
  },
  () => {
    src(['**/*.js'], gulpSrcOptions)
      .pipe(scripts.terserMinify())
      .pipe(dest(outputDir))
  },
  () => {
    src(['**/*.wxss'], gulpSrcOptions).pipe(wxss.purify()).pipe(dest(outputDir))
  },
  () => {
    src(['**/*.png,jpg,jpeg,gif'], gulpSrcOptions)
      .pipe(images.min())
      .pipe(dest(outputDir))
  },
  () => {
    // copy other files
    src(
      ['**/*.*', '!**/*.(wxml|wxss|js|json|png|jpg|jpeg|gif)'],
      gulpSrcOptions
    ).pipe(dest(outputDir))
  }
)

module.exports = {
  async run(opts) {
    await fsPromises.rm(outputPath, { recursive: true, force: true })
    parallelTask()
  },
}
