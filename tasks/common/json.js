const through2 = require('through2')
const { jimHelper } = require('../common/config')

module.exports = {
  injectJimHelperPage: () =>
    through2.obj(async (file, _, cb) => {
      try {
        const fileContent = file.contents.toString()
        if (file.basename === 'app.json') {
          const appJson = JSON.parse(fileContent)
          appJson['subPackages'].push(jimHelper)
          file.contents = Buffer.from(JSON.stringify(appJson, null, '  '))
        }
        cb(null, file)
      } catch (e) {
        cb(null, file)
      }
    }),
}
