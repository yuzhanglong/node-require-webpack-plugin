/*
 * File: utils.ts
 * Description: 工具函数集合
 * Created: 2021-3-19 11:05:49
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

// 添加 rules (loader)
import * as webpack from 'webpack'

interface SourceLike {
  source(): string | Buffer;
}

const LOADER_PATH = require.resolve('./require-loader.js')

// 添加 rules
export const addCompilerRules = (compiler: webpack.Compiler, rules: webpack.RuleSetRule[]) => {
  const compilerOptions = compiler.options
  if (!compilerOptions.module) {
    compilerOptions.module = { rules: rules } as any
  } else {
    const moduleOptions = compilerOptions.module
    moduleOptions.rules = (moduleOptions.rules || []).concat(rules)
  }
}

// 获取内容
export const getRequireContent = (asset: SourceLike) => `function __WEBPACK_PURE_REQUIRE__(content) {
  /******/ return require(content)
} \n\n\n${asset.source()}`


// 获取 rules
export const createRules = (): webpack.RuleSetRule[] => {
  return [
    {
      test: /\.js$/,
      loader: LOADER_PATH
    }
  ]
}