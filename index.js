#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const argv = require('yargs').argv

argv.entry = './dist/app.json'
argv.output = './dist/title.json'

const entry = argv.entry
const output = argv.output
if (!entry) {
  console.log(chalk.red('入口路径必填'))
  return
}
if (!output) {
  console.log(chalk.red('出口路径错误'))
  return
}

console.log('__dirname', __dirname)
console.log('__filename', __filename)
console.log('process.cwd()', process.cwd())
console.log(path.resolve('./'));

// const appJson = fs.readFileSync(entry, { encoding: 'utf-8' })
// const objAppJson = JSON.parse(appJson)
// const result = objAppJson.pages.map(v => {
//   const obj = {
//     path: v
//   }
//   const pageJson = fs.readFileSync(`${__dirname}/src/${v}.json`, { encoding: 'utf-8' })
//   const objPageJson = JSON.parse(pageJson)
//   obj.title = objPageJson.navigationBarTitleTextBak || objPageJson.navigationBarTitleText || ''
//   return obj
// })
// objAppJson.subpackages.forEach(v1 => {
//   v1.pages.forEach(v => {
//     const path = v1.root + v
//     const obj = { path }
//     const pageJson = fs.readFileSync(`${__dirname}/src/${path}.json`, { encoding: 'utf-8' })
//     const objPageJson = JSON.parse(pageJson)
//     obj.title = objPageJson.navigationBarTitleTextBak || objPageJson.navigationBarTitleText || ''
//     result.push(obj)
//   })
// })
// fs.writeFileSync(output, JSON.stringify(result, null, '\t'), { encoding: 'utf-8' })

console.log(chalk.green(`文件生成完毕，文件路径为：${path.join(__dirname, output)}`))
