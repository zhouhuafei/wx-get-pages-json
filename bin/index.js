#!/usr/bin/env node

const chalk = require('chalk')
const argv = require('yargs').argv
const fn = require('../index')

const entry = argv.entry
const output = argv.output

if (!entry) {
  console.log(chalk.red('entry：入口路径必填'))
  return
}
if (!output) {
  console.log(chalk.red('output：出口路径错误'))
  return
}

fn(entry, output)
