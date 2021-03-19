/*
 * File: require-loader.ts
 * Description: 处理 require 的 loader
 * Created: 2021-3-19 10:23:05
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import concatRequireString from './concat-require-string'

const PURE_REQUIRE_REGEX = /(.*)(\/\*#__PURE_REQUIRE__\*\/) (require)\((.*)\)(.*)/

module.exports = (source: string) => {
  const data = source.split('\n')
  for (let i = 0; i < data.length; i++) {
    const matcher = data[i].match(PURE_REQUIRE_REGEX)
    if (matcher) {
      data[i] = concatRequireString(matcher)
    }
  }
  return data.join('\n')
}