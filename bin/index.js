#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const argv = require('yargs').argv

const entry = argv.entry
const output = argv.output
const pages = argv.pages
const isJs = path.extname(output) === '.js'

if (!entry) {
  console.log(chalk.red('entry：入口路径必填'))
  return
}
if (!output) {
  console.log(chalk.red('output：出口路径错误'))
  return
}
if (!pages) {
  console.log(chalk.red('pages：页面路径错误'))
  return
}

console.log(chalk.blue(__dirname))
console.log(chalk.blue(__filename))
console.log(chalk.blue(process.cwd()))
console.log(chalk.blue(path.resolve('./')))

console.log(chalk.cyan(path.join(process.cwd(), entry)))
console.log(chalk.cyan(path.join(process.cwd(), output)))
console.log(chalk.cyan(path.join(process.cwd(), pages)))

console.log(chalk.blue(path.join('./', entry)))
console.log(chalk.blue(path.join('./', output)))
console.log(chalk.blue(path.join('./', pages)))

console.log(chalk.cyan(path.resolve('./', entry)))
console.log(chalk.cyan(path.resolve('./', output)))
console.log(chalk.cyan(path.resolve('./', pages)))

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

console.log(chalk.blue(`文件生成完毕，文件路径为：${path.join(__dirname, output)}`))
