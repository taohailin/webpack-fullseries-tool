# webpack-fullseries-tool
> 曰：“工欲善其事，必先利其器”，此项目专为前端工程师打造的webpack全系列开发，不局限于官网建设、后台管理系统、移动端开发（h5）。不局限于react、vue等框架
---
# 一、项目分支介绍
> 项目分支目前支持基础webpack项目建设（可扩展性），移动端开发，后台管理系统
- ## dev分支
> 配置完善的webpack基建，可由用户在此基础上应用于其他框架项目
- ## mobile分支
> 用于开发h5的利器，具备完善的手机适配方案，全面支持sass
- ## admin分支
> react+redux+antdesign+less开发大中型企业级后台管理系统
---
# 二、项目使用教程
> 在node环境下安装有npm、cnpm、yarn
- ## 安装依赖包

```
npm i
```

- ## 运行项目

```
npm start
```

- ## 上线打包

```
npm run dist
```
- ## 线上测试

```
npm run test
```
- ## 打包分析

```
npm run analyze
```

---
# 三：babel编译转换标准通用语法

> 项目中可以使用最新javascript版本语法，但是浏览器并不完全支持，为了浏览器能够支持所以需要编译转换为浏览器的支持的标准语法，所以babel是不二首选
- ## webpack4的babel配置
1. 安装babel核心、模块解析包以及预处理器

```
npm install --save-dev babel-core babel-loader babel-preset-env
```
2. 配置模块解析包（配置文件例如：webpack.config.js）以及预处理器（.babelrc）

```
rules: [
  {
    test: /\.js|jsx$/,
    exclude: /node_modules/,
    use: [
      "babel-loader"
    ]
  },
]
```

```
{
  "presets": ["env"]
}
```
- ## 不支持新的通用标准以及原生语法怎么办？比如Promise
1. babel-polyfill的cdn方式，放在html head标签里靠前位置
```
<script src="https://cdn.bootcss.com/babel-polyfill/6.26.0/polyfill.min.js"></script>
```
2. babel-polyfill的npm方式（两种）
```
npm i babel-polyfill --save-dev
```
&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;方法1：在入口文件最顶部
```
import 'babel-polyfill'
```
&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;方法2：配置入口文件，比如：
```
entry: {
    app: [
      'babel-polyfill',
      './src/index'
    ]
  },
```
---


# 四：按需加载
> 有时候项目需要为了提高首次载入速度而需要按需加载，比如react-router的按需加载
- ## webpack4项目配置
1. babel-plugin-syntax-dynamic-import插件

```
npm install --save-dev babel-plugin-syntax-dynamic-import
```
2. 配置.babelrc

```
{
  "plugins": ["syntax-dynamic-import"]
}
```

3. webpack生产环境中的output配置

```
{
    ...
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
}
```

- ## 按需加载的写法
1. import
```
function getComponent() {
  return import('lodash').then(_ => {
    var element = document.createElement('div');
    return element;
  }).catch(error => console.log(error));
}
getComponent().then(component => {
  console.log(component);
});
```
2. async

```
async function getComponent() {
  const bundle = await import('lodash');
  return bundle;
}
getComponent().then(bundle => {
  console.log(bundle.default)
});
```
3.require

```
require.ensure([], function(require) {
  let bundle = require("lodash");
  console.log(bundle);
}, 'bundle');
```


