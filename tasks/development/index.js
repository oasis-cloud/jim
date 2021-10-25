const { watch } = require('gulp')
const fsPromises = require('fs/promises')
const ignore = require('../common/ignore')
const wxml = require('../common/wxml')
const { outputPath } = require('../common/config')
const {
  wxmlTask,
  jsonTask,
  scriptTask,
  wxssTask,
  imageTask,
  copyRestFileTask,
} = require('../common')

module.exports = {
  async run(opts) {
    await fsPromises.rm(outputPath, { recursive: true, force: true })
    await wxml.copyJimHelper2Project()
    wxmlTask()
    jsonTask()
    scriptTask()
    wxssTask()
    imageTask()
    copyRestFileTask()

    const watchIgnore = { ignored: ignore }
    watch(['**/*.wxml'], watchIgnore, wxmlTask)
    watch(['**/*.json'], watchIgnore, jsonTask)
    watch(['**/*.js'], watchIgnore, scriptTask)
    watch(['**/*.wxss'], watchIgnore, wxssTask)
    watch(['**/*.{png,jpg,jpeg,gif}'], watchIgnore, imageTask)
  },
}
