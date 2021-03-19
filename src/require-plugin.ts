/*
 * File: require-plugin.ts
 * Description: require plugin
 * Created: 2021-3-19 10:22:01
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import { Compiler } from 'webpack'
import { RawSource } from 'webpack-sources'
import { addCompilerRules, createRules, getRequireContent } from './utils'


class NodeRequireWebpackPlugin {
  apply(compiler: Compiler) {
    // 添加所需的 webpack loader
    addCompilerRules(compiler, createRules())

    // make hooks, 在 compilation 结束之前执行
    compiler.hooks.make.tap('make', (compilation) => {
      // 处理资源的 hook
      compilation.hooks.processAssets.tap('processAssets', (assets) => {
        let keys = Object.keys(assets)
        keys.forEach(key => {
          if (key.endsWith('.js')) {
            let asset = assets[key]
            let content = getRequireContent(asset)
            assets[key] = new RawSource(content)
          }
        })
      })
    })
  }
}

export default NodeRequireWebpackPlugin