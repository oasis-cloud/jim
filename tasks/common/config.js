const cwd = process.cwd()
const outputDir = 'output'
const outputPath = `${cwd}/${outputDir}`
const jimHelper = {
  root: 'jim/helper',
  pages: ['helper'],
}
const jimHelperMiniPath = '/jim/helper/helper'

module.exports = {
  outputDir,
  outputPath,
  jimHelper,
  jimHelperMiniPath,
}
