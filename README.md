# 功能说明
> 获取微信小程序中所有页面对应json文件中的内容并以数组的形式组合成一个新文件。可用以获取每个页面的`路径`和`标题`等。

# 使用方式1
* 安装
```
npm i --save-dev wx-get-pages-json
```
* 配置
    * 在`package.json`中新增
    ```
    {
      "scripts": {
        "wx-get-pages-json": "npx wx-get-pages-json --entry=./dist/app.json --output=./dist/page.js"
      }
    }
    ```
    * entry：app.json的路径
    * output：输出的文件路径
* 运行
```
npm run wx-get-pages-json
```

# 使用方式2
* 安装
```
npm i --save-dev wx-get-pages-json
```
* 使用
```
const wxGetPagesJson = require('wx-get-pages-json')
const arr = wxGetPagesJson('./dist/app.json', './dist/page.js')
console.log(arr) // 所有页面的json集合
```
