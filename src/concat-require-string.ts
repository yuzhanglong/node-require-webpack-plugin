/**
 * 拼接 require 内容
 *
 * @param matcher 匹配成功后的匹配信息数组，其中每项内容如下：
 * - 匹配到的所有内容
 * - require 语句前内容
 * - PURE_REQUIRE__标记
 * - require 文本
 * - require 语句内包裹内容
 * - require 语句后内容 (常见的有分号)
 *
 * 例如： `/#__PURE_REQUIRE__/ require(foo)`
 * 将被处理成：`__WEBPACK_PURE_REQUIRE__(foo)`
 *
 * @author yuzhanglong
 * @date 2021-3-19 09:42:54
 */
const concatRequireString = (matcher: string[]) => {
  // [[return] [/*#__PURE_REQUIRE__*/] [require](['foo'])[;]]
  //     1                2               3         4     5
  if (matcher.length !== 6) {
    return matcher[0]
  }
  return `${matcher[1]} __WEBPACK_PURE_REQUIRE__(${matcher[4]})${matcher[5]}`
}

export default concatRequireString