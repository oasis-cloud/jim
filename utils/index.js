const path = require('path')
const fs = require('fs')

function readAppJson() {
  return require(path.join(process.cwd(), 'app.json'))
}

function getFirstTabPath() {
  return path.join(process.cwd(), readAppJson().tabBar.list[0].pagePath)
}

function readGitIgnoreFile() {
  const fileContent = fs.readFileSync(`${process.cwd()}/.gitignore`)
  if (!fileContent) return ''
  return fileContent.toString()
}

function gitIgnoreToList() {
  const gitIgnore = readGitIgnoreFile().split('\n')
  return gitIgnore.filter((item) => item != '')
}

module.exports = {
  readAppJson,
  getFirstTabPath,
  readGitIgnoreFile,
  gitIgnoreToList,
}
