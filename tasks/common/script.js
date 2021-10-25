const through2 = require('through2')
const terser = require('terser')
const { generateEnvTpl } = require('../../utils/env')

module.exports = {
  injectProcessEnv: () =>
    through2.obj(async (file, _, cb) => {
      try {
        if (file.path == `${process.cwd()}/app.js`) {
          let fileContent = file.contents.toString()
          fileContent = `${generateEnvTpl()}\n${fileContent}`
          file.contents = Buffer.from(fileContent)
        }
        cb(null, file)
      } catch (e) {
        cb(null, file)
      }
    }),
  terserMinify: () =>
    through2.obj(async (file, _, cb) => {
      try {
        const fileContent = file.contents.toString()
        const result = await terser.minify(fileContent, {
          compress: false,
          mangle: false,
          output: {
            beautify: true,
            comments: false,
            indent_level: 2,
          },
        })
        file.contents = Buffer.from(result.code)
        cb(null, file)
      } catch (e) {
        cb(null, file)
      }
    }),
}
