function parseNodeEnv2Obj() {
  // UseBeta,BetaAPI=api.jd.com,
  const envObj = {}
  if (!process.env.NODE_ENV) return {}
  const envList = process.env.NODE_ENV.split(',')
  envList.map((item) => {
    if (item.includes('=')) {
      const [key, val] = item.split('=')
      envObj[key] = val
    } else {
      envObj[item] = true
    }
  })
  return JSON.stringify(envObj)
}
function generateEnvTpl() {
  return `global.process = {
      env: ${parseNodeEnv2Obj()}
    }`
}

module.exports = {
  generateEnvTpl,
}
