const { gitIgnoreToList } = require('../../utils')
const { outputDir } = require('./config')
module.exports = [...gitIgnoreToList(), 'node_modules/**', `${outputDir}/**`]
