const path = require('path')
const purify = require('purify-css')
const through2 = require('through2')

module.exports = {
  purify: () =>
    through2.obj(async (file, _, cb) => {
      try {
        const dirname = path.dirname(file.path)
        const contents = file.contents.toString()

        // purify css 不支持
        // todo: 可以考虑先删掉，然后在 purify
        // if (contents.indexOf('@import') > -1) {
        //   cb(null, file)
        //   return
        // }

        purify(
          [`${dirname}/*.js`, `${dirname}/*.wxml`],
          contents,
          function (purified) {
            file.contents = Buffer.from(purified)
            cb(null, file)
          }
        )
      } catch (e) {
        cb(null, file)
      }
    }),
}
