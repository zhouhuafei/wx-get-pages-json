const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

module.exports = function (entry, output) {
  const pages = path.dirname(output)
  const isJs = path.extname(output) === '.js'
  const appJson = fs.readFileSync(entry, { encoding: 'utf-8' })
  const objAppJson = JSON.parse(appJson)
  const result = objAppJson.pages.map(v => {
    const obj = {
      path: v
    }
    const pageJson = fs.readFileSync(path.join(pages, `${v}.json`), { encoding: 'utf-8' })
    obj.json = JSON.parse(pageJson || '{}')
    return obj
  })
  objAppJson.subpackages.forEach(v1 => {
    v1.pages.forEach(v => {
      const myPath = v1.root + v
      const obj = { path: myPath }
      const pageJson = fs.readFileSync(path.join(pages, `${myPath}.json`), { encoding: 'utf-8' })
      obj.json = JSON.parse(pageJson || '{}')
      result.push(obj)
    })
  })
  let resultStr = JSON.stringify(result, null, '\t')
  if (isJs) {
    resultStr = `module.exports = ${resultStr}`
  }
  fs.writeFileSync(output, resultStr, { encoding: 'utf-8' })

  console.log(chalk.blue(`文件生成完毕，文件路径为：${path.resolve('./', output)}`))

  return result
}
