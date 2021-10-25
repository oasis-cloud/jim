const fsPromises = require('fs/promises')
const path = require('path')
const through2 = require('through2')
const minify = require('html-minifier-terser').minify
const utils = require('../../utils')
const { outputPath, jimHelperMiniPath } = require('../common/config')
const firstTabPath = utils.getFirstTabPath()

module.exports = {
  copyJimHelper2Project: async () => {
    const destPath = `${outputPath}/jim/helper/`
    const helperExt = ['js', 'json', 'wxml', 'wxss']
    const jimHelperPath = path.join(__dirname, '../../jim-helper')

    await fsPromises.mkdir(destPath, { recursive: true })

    helperExt.map(async (ext) => {
      await fsPromises.copyFile(
        `${jimHelperPath}/helper.${ext}`,
        `${destPath}/helper.${ext}`
      )
    })
  },
  minify: () =>
    through2.obj(async (file, _, cb) => {
      try {
        let result = await minify(file.contents.toString(), {
          caseSensitive: true,
          removeComments: true,
          removeEmptyAttributes: false,
          collapseWhitespace: true,
          keepClosingSlash: true,
          // html5: false,
        })
        file.contents = Buffer.from(result)
        cb(null, file)
      } catch (e) {
        cb(null, file)
      }
    }),
  injectJimHelper: () =>
    through2.obj(async (file, _, cb) => {
      if (file.path === `${firstTabPath}.wxml`) {
        file.contents = Buffer.from(
          file.contents.toString() +
            `\n<navigator url="${jimHelperMiniPath}" style="position: fixed;bottom: 10rpx;right: 10rpx;background: #5274b1;color: #FFF;z-index: 9999999999;">JimHelper</navigator>`
        )
      }
      cb(null, file)
    }),
}
