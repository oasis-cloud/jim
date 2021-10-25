const { program } = require('commander')
const packageJson = require('./package.json')
const tasks = require('./tasks/task-entry')

program.version(packageJson.version, '-v, --version', 'The current version')
program.option(
  '-d, --development',
  '\n\tdevelopment watch \n\tdevelopment inject test package'
)
program.option('-p, --production', 'production')

program.parse()
tasks(program.opts())
