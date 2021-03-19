# node-require-webpack-plugin

为 node.js 环境下的 webpack 打包结果提供动态 require 支持。

## 为什么要使用

在某些情况下，我们需要让 webpack 打包的文件在 node.js 环境下运行，例如 GitHub Action 的开发，但是会有一些问题：

```javascript
const a = require(process.argv)
```

上面的代码中，我们动态 `require` 了用户传入的参数，但 webpack 并不知道 -- 在 build 时它会尝试寻找 `process.argv` 的值。

在我们执行打包时的代码时，我们会得到异常，这个异常产生的原因是 webpack 打包时找不到参数所对应的模块。

## 用法

首先安装依赖：

```bash
npm install node-require-webpack-plugin -D
```

添加 plugin 配置到 `webpack.config.js`:

```javascript
module.exports = {
  plugins: [
    new NodeRequireWebpackPlugin()
  ]
}
```

在你需要动态 require 的语句前增加 `/*#__PURE_REQUIRE__*/` 标记，例如：

```javascript
const requireResult =  /*#__PURE_REQUIRE__*/ require(`${configPath}`);
```

## 工作原理

- 将所有用户标记 `/*#__PURE_REQUIRE__*/` 的模块全部换成一个函数 `__WEBPACK_PURE__REQUIRE__`
- 为每个入口文件添加 `__WEBPACK_PURE__REQUIRE__` 的实现：

```javascript
function __WEBPACK_PURE_REQUIRE__(content) {
  /******/
  return require(content)
}
```





