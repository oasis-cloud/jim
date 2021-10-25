const allTasks = {
  productionTask: require('./production'),
  developmentTask: require('./development'),
  testTask: require('./test/index'),
}

function tasks(opts) {
  for (const key in opts) {
    allTasks[key + 'Task'].run(opts[key])
  }
}

module.exports = tasks
